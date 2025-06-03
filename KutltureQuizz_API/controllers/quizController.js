const data = require('../data/data.js');

// Récupérer toutes les catégories
exports.getCategories = (req, res) => {
  res.json(data.categories);
};

// Récupérer toutes les questions d'une catégorie
exports.getQuestionsByCategory = (req, res) => {
  const category = req.params.category;
  const questions = data.questions[category];
  if (!questions) {
    return res.status(404).json({ error: 'Catégorie non trouvée' });
  }
  res.json(questions);
};

// Récupérer une question précise d'une catégorie
exports.getQuestionById = (req, res) => {
  const category = req.params.category;
  const id = parseInt(req.params.id, 10);
  const questions = data.questions[category];
  if (!questions) {
    return res.status(404).json({ error: 'Catégorie non trouvée' });
  }
  const question = questions.find(q => q.id === id);
  if (!question) {
    return res.status(404).json({ error: 'Question non trouvée' });
  }
  res.json(question);
};

// Vérifier une réponse
exports.checkAnswer = (req, res) => {
  const { category, questionId, answerId } = req.body;
  const questions = data.questions[category];
  if (!questions) {
    return res.status(404).json({ error: 'Catégorie non trouvée' });
  }
  const question = questions.find(q => q.id === questionId);
  if (!question) {
    return res.status(404).json({ error: 'Question non trouvée' });
  }
  const answer = question.answers.find(a => a.id === answerId);
  if (!answer) {
    return res.status(404).json({ error: 'Réponse non trouvée' });
  }
  res.json({ isCorrect: answer.isCorrect });
}; 