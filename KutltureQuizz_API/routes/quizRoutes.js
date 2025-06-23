const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/categories
router.get('/categories', quizController.getCategories);

// GET /api/quizzes (optionnel: ?category_id=...)
router.get('/quizzes', quizController.getQuizzes);

// GET /api/quizzes/:id
router.get('/quizzes/:id', quizController.getQuizById);

// POST /api/quizzes
router.post('/quizzes', quizController.createQuiz);

// GET /api/questions (optionnel: ?quiz_id=...)
router.get('/questions', quizController.getQuestions);

// GET /api/questions/:category
router.get('/questions/:category', quizController.getQuestionsByCategory);

// GET /api/questions/:category/:id
router.get('/questions/:category/:id', quizController.getQuestionById);

// POST /api/answer
router.post('/answer', quizController.checkAnswer);

// POST /api/categories
router.post('/categories', quizController.createCategory);

// POST /api/questions
router.post('/questions', quizController.createQuestion);

// POST /api/score (sauvegarder un score de quiz)
router.post('/score', authenticateToken, quizController.saveQuizScore);

module.exports = router; 