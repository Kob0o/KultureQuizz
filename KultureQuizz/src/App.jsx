import { useState } from 'react'
import { questions } from './QuizData'
import './App.css'
import chatgptLogo from './assets/img/ChatGPT Image 16 mai 2025, 10_17_21.png'

const categories = ["Géographie", "Art", "Sciences", "Histoire"]

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  // Filtrer les questions selon la catégorie choisie
  const filteredQuestions = selectedCategory
    ? questions.filter(q => q.category === selectedCategory)
    : []

  const handleAnswer = (index) => {
    setSelected(index)
  }

  const handleNext = () => {
    if (selected === filteredQuestions[current].correct) {
      setScore(score + 1)
    }
    if (current < filteredQuestions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setShowScore(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
  }

  const handleCategory = (cat) => {
    setSelectedCategory(cat)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
  }

  return (
    <div className="quiz-container">
      <img src={chatgptLogo} alt="Logo" className="quiz-logo" />
      <h1>KultureQuizz</h1>
      {!selectedCategory ? (
        <div className="category-section">
          <h2>Choisissez une catégorie</h2>
          <div className="categories">
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategory(cat)} className="category-btn">
                {cat}
              </button>
            ))}
          </div>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Votre score : {score} / {filteredQuestions.length}</h2>
          <button onClick={handleRestart}>Recommencer la catégorie</button>
          <button onClick={handleBackToCategories} style={{ marginLeft: 8 }}>Changer de catégorie</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>{selectedCategory} — Question {current + 1} / {filteredQuestions.length}</h2>
          <p>{filteredQuestions[current].question}</p>
          <div className="answers">
            {filteredQuestions[current].answers.map((answer, idx) => (
              <button
                key={idx}
                className={selected === idx ? 'selected' : ''}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
              >
                {answer}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="next-btn"
          >
            {current === filteredQuestions.length - 1 ? 'Voir le score' : 'Suivant'}
          </button>
          <button onClick={handleBackToCategories} style={{ marginLeft: 8, marginTop: 10 }}>Changer de catégorie</button>
        </div>
      )}
    </div>
  )
}

export default App
