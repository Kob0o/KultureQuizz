import { useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'

function ScoreDisplay({ score, totalQuestions, onRestart, onBackToCategories, quizId, categoryId }) {
  const { user, token } = useAuth()
  const hasSavedScore = useRef(false)
  const percentage = Math.round((score / totalQuestions) * 100)
  
  // Sauvegarder automatiquement le score
  useEffect(() => {
    const saveScore = async () => {
      // Protection contre la double sauvegarde
      if (hasSavedScore.current || !user || !token || !quizId || !categoryId) return

      try {
        hasSavedScore.current = true // Marquer comme sauvegardé
        
        const response = await fetch('http://localhost:4000/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quizId,
            categoryId,
            score,
            maxScore: totalQuestions
          })
        })

        if (response.ok) {
          console.log('Score sauvegardé avec succès')
        } else {
          console.error('Erreur lors de la sauvegarde du score')
          hasSavedScore.current = false // Réinitialiser en cas d'erreur
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du score:', error)
        hasSavedScore.current = false // Réinitialiser en cas d'erreur
      }
    }

    saveScore()
  }, [user, token, quizId, categoryId, score, totalQuestions])
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent ! Vous êtes un expert ! 🏆"
    if (percentage >= 70) return "Très bien ! Vous avez de bonnes connaissances ! 👍"
    if (percentage >= 50) return "Pas mal ! Continuez à apprendre ! 📚"
    return "Pas de panique, la pratique rend parfait ! 💪"
  }

  return (
    <div className="score-container" style={{
      background: 'rgba(20,20,40,0.95)',
      borderRadius: 'var(--border-radius-xl)',
      boxShadow: 'var(--shadow-glow)',
      padding: '3rem 2rem',
      margin: '2rem auto',
      maxWidth: '500px',
      color: 'var(--text-primary)'
    }}>
      <h1 className="score-title">Quiz terminé !</h1>
      <div className="score-value">{score} / {totalQuestions}</div>
      <div className="score-text">{getScoreMessage()}</div>
      <div className="score-actions">
        <button className="btn btn-primary" onClick={onRestart}>
          Recommencer
        </button>
        <button className="btn btn-outline" onClick={onBackToCategories}>
          Nouvelle catégorie
        </button>
      </div>
    </div>
  )
}

export default ScoreDisplay 