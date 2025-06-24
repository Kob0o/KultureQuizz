import { useEffect, useState, useRef } from 'react'
import AnswerList from './AnswerList'

function QuestionDisplay({ 
  question, 
  displayedAnswers,
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onBackToCategories,
  current,
  totalQuestions,
  showScore
}) {
  const [timer, setTimer] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)
  const [localSelected, setLocalSelected] = useState(null)
  const [answerStatus, setAnswerStatus] = useState(null)
  const timeoutRef = useRef()
  const intervalRef = useRef()
  const hasHandledAnswer = useRef(false)

  // Reset tout quand on change de question
  useEffect(() => {
    setTimer(30)
    setIsAnswered(false)
    setLocalSelected(null)
    setAnswerStatus(null)
    hasHandledAnswer.current = false
    
    // Clear tous les timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [current, question])

  // Timer unique qui ne se relance jamais
  useEffect(() => {
    if (!question) return

    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Timer fini, traiter la réponse
            if (!hasHandledAnswer.current) {
              hasHandledAnswer.current = true
              
              // Logique de timeout directement ici
              setIsAnswered(true)
              setLocalSelected(null)
              
              // Arrêter le timer immédiatement
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
              }

              setAnswerStatus('timeout')
              onSelectAnswer(null)

              // Attendre 1s puis passer à la question suivante
              timeoutRef.current = setTimeout(() => {
                onNext()
              }, 1000)
            }
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }

    startTimer()

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [current, question, onSelectAnswer, onNext]) // Seulement quand on change de question

  // Générer les réponses à partir de displayedAnswers[current]
  const answers = (displayedAnswers && displayedAnswers[current])
    ? displayedAnswers[current].map((opt, idx) => ({ id: idx, text: opt }))
    : []

  function handleAnswer(answerText, isTimeout = false) {
    // Protection contre les appels multiples
    if (hasHandledAnswer.current) return
    hasHandledAnswer.current = true

    setIsAnswered(true)
    setLocalSelected(answerText)
    
    // Arrêter le timer immédiatement
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Coloration
    if (answerText === question.correct_answer) {
      setAnswerStatus('correct')
    } else if (answerText !== null) {
      setAnswerStatus('incorrect')
    } else {
      setAnswerStatus('timeout')
    }

    // Score uniquement si bonne réponse et pas timeout
    if (answerText === question.correct_answer && !isTimeout) {
      onSelectAnswer(answerText)
    } else {
      onSelectAnswer(null)
    }

    // Attendre 1s puis passer à la question suivante
    timeoutRef.current = setTimeout(() => {
      onNext()
    }, 1000)
  }

  if (!question) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Chargement de la question...
      </div>
    )
  }

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="question-progress">
          Question {current + 1} / {totalQuestions}
        </div>
        <div className={`timer${timer <= 10 ? (timer <= 5 ? ' danger' : ' warning') : ''}`}>
          <span className="timer-icon">⏱️</span>
          <span>{timer}s</span>
        </div>
      </div>
      <div className="question-text">{question.question}</div>
      {question.image && (
        <img 
          src={question.image} 
          alt="question visuelle" 
          style={{
            maxWidth: '100%',
            maxHeight: '200px',
            borderRadius: 'var(--border-radius-lg)',
            margin: '0 auto var(--spacing-6)',
            display: 'block',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
      )}
      <AnswerList 
        answers={answers}
        selectedAnswer={localSelected}
        onSelectAnswer={answerText => handleAnswer(answerText, false)}
        correctAnswer={isAnswered ? question.correct_answer : null}
        answerStatus={answerStatus}
      />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
        {showScore && (
          <button 
            className="btn btn-outline"
            onClick={onBackToCategories}
            style={{ flex: 1 }}
          >
            Changer de catégorie
          </button>
        )}
      </div>
    </div>
  )
}

export default QuestionDisplay 