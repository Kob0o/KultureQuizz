const { createClient } = require('@supabase/supabase-js');
const { supabase: supabaseBase } = require('../data/supabaseClient');

// Helper pour créer un client Supabase avec le JWT utilisateur
function getSupabaseWithJWT(req) {
  const jwt = req.headers['authorization']?.replace('Bearer ', '');
  if (!jwt) return supabaseBase;
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${jwt}` } } }
  );
}

// Récupérer toutes les catégories
exports.getCategories = async (req, res) => {
  try {
    const supabase = getSupabaseWithJWT(req);
    console.log('GET /api/categories - Début de la requête');
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Erreur Supabase getCategories:', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('GET /api/categories - Succès:', data?.length, 'catégories trouvées');
    res.json(data || []);
  } catch (error) {
    console.error('Erreur inattendue getCategories:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Créer une catégorie
exports.createCategory = async (req, res) => {
  try {
    const { name, description, user_id } = req.body;
    const supabase = getSupabaseWithJWT(req);
    console.log('POST /api/categories', { name, description, user_id });
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, description, user_id }])
      .select();
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erreur inattendue createCategory:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Récupérer toutes les questions d'une catégorie
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const supabase = getSupabaseWithJWT(req);
    console.log('GET /api/questions/:category - Catégorie:', category);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('category_id', category);
    if (error) {
      console.error('Erreur Supabase getQuestionsByCategory:', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('GET /api/questions/:category - Succès:', data?.length, 'questions trouvées');
    res.json(data || []);
  } catch (error) {
    console.error('Erreur inattendue getQuestionsByCategory:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Créer un quiz
exports.createQuiz = async (req, res) => {
  try {
    const { name, category_id, user_id } = req.body;
    const supabase = getSupabaseWithJWT(req);
    const { data, error } = await supabase
      .from('quizzes')
      .insert([{ name, category_id, user_id }])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du quiz' });
  }
};

// Récupérer tous les quizzes (optionnel: filtrer par catégorie)
exports.getQuizzes = async (req, res) => {
  try {
    const { category_id } = req.query;
    const supabase = getSupabaseWithJWT(req);
    let query = supabase.from('quizzes').select('*');
    if (category_id) query = query.eq('category_id', category_id);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des quizzes' });
  }
};

// Récupérer un quiz par id
exports.getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseWithJWT(req);
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' });
  }
};

// Récupérer les questions d'un quiz
exports.getQuestions = async (req, res) => {
  try {
    const { quiz_id } = req.query;
    const supabase = getSupabaseWithJWT(req);
    let query = supabase.from('questions').select('*');
    if (quiz_id) query = query.eq('quiz_id', quiz_id);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des questions' });
  }
};

// Créer une question (lié à un quiz)
exports.createQuestion = async (req, res) => {
  try {
    const { quiz_id, question, correct_answer, options, image_url } = req.body;
    const supabase = getSupabaseWithJWT(req);
    const { data, error } = await supabase
      .from('questions')
      .insert([{ quiz_id, question, correct_answer, options, image_url }])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la question' });
  }
};

// Récupérer une question précise d'une catégorie
exports.getQuestionById = async (req, res) => {
  try {
    const id = req.params.id;
    const supabase = getSupabaseWithJWT(req);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  } catch (error) {
    console.error('Erreur inattendue getQuestionById:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Vérifier une réponse (optionnel, à adapter selon ta logique)
exports.checkAnswer = (req, res) => {
  res.status(501).json({ error: 'Non implémenté côté API, à gérer côté front.' });
};

// Sauvegarder un score de quiz
exports.saveQuizScore = async (req, res) => {
  try {
    const { quizId, categoryId, score, maxScore } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    if (!quizId || !categoryId || score === undefined || !maxScore) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const supabase = getSupabaseWithJWT(req);
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

    if (error) {
      console.error('Erreur lors de la sauvegarde du score:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Erreur inattendue saveQuizScore:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}; 