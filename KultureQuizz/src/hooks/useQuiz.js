import { useState, useEffect } from 'react'
import { fetchCategories, fetchQuestions, checkAnswer } from '../api/quizApi'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function useQuiz() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [displayedAnswers, setDisplayedAnswers] = useState([])

  // Charger les catégories au montage
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError("Impossible de charger les catégories"))
  }, [])

  // Charger les questions quand une catégorie est choisie
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true)
      fetchQuestions(selectedCategory.name || selectedCategory)
        .then(qs => {
          setQuestions(qs)
          setLoading(false)
        })
        .catch(() => {
          setError("Impossible de charger les questions")
          setLoading(false)
        })
    }
  }, [selectedCategory])

  // Générer 4 réponses aléatoires à chaque changement de question
  useEffect(() => {
    if (questions.length > 0 && questions[current]) {
      const allAnswers = questions[current].answers;
      const correctAnswer = allAnswers.find(a => a.isCorrect);
      const incorrectAnswers = allAnswers.filter(a => !a.isCorrect);
      const randomIncorrect = shuffleArray([...incorrectAnswers]).slice(0, 3);
      const answersToDisplay = shuffleArray([correctAnswer, ...randomIncorrect]);
      setDisplayedAnswers(answersToDisplay);
    } else {
      setDisplayedAnswers([]);
    }
  }, [questions, current]);

  const handleAnswer = (answerId) => {
    setSelected(answerId)
  }

  const handleNext = async () => {
    if (selected !== null) {
      const res = await checkAnswer(selectedCategory.name || selectedCategory, questions[current].id, selected)
      if (res.isCorrect) setScore(score + 1)
    }
    if (current < questions.length - 1) {
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
    setError(null)
  }

  const handleCategory = (cat) => {
    setSelectedCategory(cat)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setError(null)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setQuestions([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setError(null)
  }

  return {
    categories,
    selectedCategory,
    questions,
    current,
    selected,
    score,
    showScore,
    loading,
    error,
    displayedAnswers,
    handleAnswer,
    handleNext,
    handleRestart,
    handleCategory,
    handleBackToCategories
  }
} 