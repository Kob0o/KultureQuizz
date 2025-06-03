import AnswerList from './AnswerList'
import Button from './Button'

function QuestionDisplay({ 
  question, 
  displayedAnswers, 
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onBackToCategories,
  current,
  totalQuestions
}) {
  if (!question) {
    return (
      <div className="question-section">
        <p>Chargement de la question...</p>
      </div>
    )
  }

  return (
    <div className="question-section">
      <h2>Question {current + 1} / {totalQuestions}</h2>
      <p>{question.question}</p>
      {question.image && (
        <img 
          src={question.image} 
          alt="question visuelle" 
          style={{maxWidth: '300px', margin: '16px auto', display: 'block'}} 
        />
      )}
      <AnswerList 
        answers={displayedAnswers}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />
      <Button
        onClick={onNext}
        disabled={selectedAnswer === null}
        className="next-btn"
      >
        {current === totalQuestions - 1 ? 'Voir le score' : 'Suivant'}
      </Button>
      <Button 
        onClick={onBackToCategories} 
        style={{ marginLeft: 8, marginTop: 10 }}
      >
        Changer de catégorie
      </Button>
    </div>
  )
}

export default QuestionDisplay 