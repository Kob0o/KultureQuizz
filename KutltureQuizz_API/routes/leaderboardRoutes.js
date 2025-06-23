const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getUserBadges,
  getUserStats,
  saveScore
} = require('../controllers/leaderboardController');

console.log('=== Chargement de leaderboardRoutes.js ===');

// Route pour récupérer les badges d'un utilisateur
router.get('/badges/:userId', getUserBadges);

// Route pour sauvegarder un score
router.post('/score', authenticateToken, saveScore);

// Route protégée pour récupérer les stats personnelles
router.get('/stats', authenticateToken, getUserStats);

module.exports = router; 