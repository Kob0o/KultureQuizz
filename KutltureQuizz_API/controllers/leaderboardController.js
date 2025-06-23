const { supabase } = require('../data/supabaseClient');

console.log('=== Chargement de leaderboardController.js ===');

// Récupérer les statistiques détaillées d'un utilisateur
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('leaderboard')
      .select(`
        id,
        score,
        max_score,
        percentage,
        completed_at,
        category_id,
        quiz_id
      `)
      .eq('user_id', userId);

    if (error) throw error;

    // Calculer les statistiques
    const stats = {
      total_quizzes: data.length,
      total_score: data.reduce((sum, entry) => sum + entry.score, 0),
      average_percentage: data.length > 0 ? 
        Math.round(data.reduce((sum, entry) => sum + entry.percentage, 0) / data.length * 100) / 100 : 0,
      best_score: data.length > 0 ? Math.max(...data.map(entry => entry.score)) : 0,
      perfect_scores: data.filter(entry => entry.percentage === 100).length,
      unique_categories: new Set(data.map(entry => entry.category_id)).size,
      unique_quizzes: new Set(data.map(entry => entry.quiz_id)).size,
      history: data.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    };

    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Sauvegarder un score
const saveScore = async (req, res) => {
  try {
    console.log('Sauvegarde score appelée pour user:', req.user?.id, req.body);
    const { quizId, categoryId, score, maxScore } = req.body;
    const userId = req.user.id;

    if (!quizId || !categoryId || score === undefined || !maxScore) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const percentage = Math.round((score / maxScore) * 100 * 100) / 100;

    const { data, error } = await supabase
      .from('leaderboard')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        category_id: categoryId,
        score: score,
        max_score: maxScore,
        percentage: percentage
      })
      .select()
      .single();

    if (error) throw error;

    // Vérifier et attribuer les badges
    await checkAndAssignBadges(userId);

    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les badges d'un utilisateur
const getUserBadges = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'ID utilisateur requis' });
    }

    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        id,
        earned_at,
        badges:badge_id(*)
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase lors de la récupération des badges:', error);
      throw error;
    }

    // Si pas de badges, retourner un tableau vide
    if (!data || data.length === 0) {
      return res.json([]);
    }

    const formattedBadges = data
      .filter(entry => entry.badges) // Filtrer les entrées sans badge
      .map(entry => ({
        id: entry.id,
        name: entry.badges.name,
        description: entry.badges.description,
        icon: entry.badges.icon,
        earned_at: entry.earned_at
      }));

    res.json(formattedBadges);
  } catch (error) {
    console.error('Erreur lors de la récupération des badges:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des badges' });
  }
};

// Fonction pour vérifier et attribuer les badges
const checkAndAssignBadges = async (userId) => {
  try {
    console.log('--- Vérification des badges pour userId:', userId);
    // Récupérer les statistiques de l'utilisateur
    const { data: userStats } = await supabase
      .from('leaderboard')
      .select('*')
      .eq('user_id', userId);

    if (!userStats || userStats.length === 0) {
      console.log('Aucune statistique trouvée pour cet utilisateur.');
      return;
    }

    const quizCount = userStats.length;
    const perfectScores = userStats.filter(stat => stat.percentage === 100).length;
    const uniqueQuizzes = new Set(userStats.map(stat => stat.quiz_id)).size;

    // Récupérer tous les badges disponibles
    const { data: badges } = await supabase
      .from('badges')
      .select('*');

    if (!badges) {
      console.log('Aucun badge disponible.');
      return;
    }

    // Récupérer les badges déjà attribués
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    const earnedBadgeIds = userBadges.map(ub => ub.badge_id);

    // Vérifier chaque badge
    for (const badge of badges) {
      if (earnedBadgeIds.includes(badge.id)) {
        console.log(`Badge déjà obtenu: ${badge.name}`);
        continue;
      }

      let shouldAward = false;
      switch (badge.criteria_type) {
        case 'quiz_count':
          shouldAward = quizCount >= badge.criteria_value;
          break;
        case 'perfect_score':
          shouldAward = perfectScores >= badge.criteria_value;
          break;
        case 'unique_quizzes':
          shouldAward = uniqueQuizzes >= badge.criteria_value;
          break;
        // Ajouter d'autres critères si nécessaire
      }

      console.log(`Test badge: ${badge.name} | Type: ${badge.criteria_type} | Value: ${badge.criteria_value} | shouldAward: ${shouldAward}`);

      if (shouldAward) {
        console.log('Tentative d\'INSERT badge', badge.name, 'pour user', userId);
        const { error: insertError } = await supabase
          .from('user_badges')
          .insert({
            user_id: userId,
            badge_id: badge.id
          });
        if (insertError) {
          console.error('Erreur lors de l\'attribution du badge:', badge.name, insertError);
        } else {
          console.log('Badge attribué:', badge.name);
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des badges:', error);
  }
};

module.exports = {
  getUserStats,
  saveScore,
  getUserBadges
}; 