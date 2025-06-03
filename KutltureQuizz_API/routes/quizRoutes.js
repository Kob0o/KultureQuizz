const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// GET /api/categories
router.get('/categories', quizController.getCategories);

// GET /api/questions/:category
router.get('/questions/:category', quizController.getQuestionsByCategory);

// GET /api/questions/:category/:id
router.get('/questions/:category/:id', quizController.getQuestionById);

// POST /api/answer
router.post('/answer', quizController.checkAnswer);

module.exports = router; 