import Button from './Button'

function ScoreDisplay({ score, totalQuestions, onRestart, onBackToCategories }) {
  return (
    <div className="score-section">
      <h2>Votre score : {score} / {totalQuestions}</h2>
      <Button onClick={onRestart}>
        Recommencer la catégorie
      </Button>
      <Button 
        onClick={onBackToCategories} 
        style={{ marginLeft: 8 }}
      >
        Changer de catégorie
      </Button>
    </div>
  )
}

export default ScoreDisplay 