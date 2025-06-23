import { useState, useEffect } from 'react'

function getRandomAnswers(options, correct_answer) {
  // Prend la bonne réponse + 3 mauvaises au hasard, puis mélange
  const wrongs = options.filter(opt => opt !== correct_answer)
  const randomWrongs = wrongs.sort(() => 0.5 - Math.random()).slice(0, 3)
  const answers = [correct_answer, ...randomWrongs].sort(() => 0.5 - Math.random())
  return answers
}

export const useQuiz = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayedAnswers, setDisplayedAnswers] = useState([])
  const [step, setStep] = useState(1) // 1: catégorie, 2: quiz, 3: questions
  const [answeredQuestions, setAnsweredQuestions] = useState({})

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchQuizzes(selectedCategory)
      setStep(2)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedQuiz) {
      fetchQuestions(selectedQuiz)
      setStep(3)
    }
  }, [selectedQuiz])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('http://localhost:4000/api/categories')
      if (!res.ok) throw new Error('Erreur lors du chargement des catégories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      setError('Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }

  const fetchQuizzes = async (category) => {
    try {
      setLoading(true)
      setError(null)
      const categoryId = category.id || category
      const res = await fetch(`http://localhost:4000/api/quizzes?category_id=${categoryId}`)
      if (!res.ok) throw new Error('Erreur lors du chargement des quiz')
      const data = await res.json()
      setQuizzes(data)
    } catch (error) {
      setError('Erreur lors du chargement des quiz')
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestions = async (quiz) => {
    try {
      setLoading(true)
      setError(null)
      const quizId = quiz.id || quiz
      const res = await fetch(`http://localhost:4000/api/questions?quiz_id=${quizId}`)
      if (!res.ok) throw new Error('Erreur lors du chargement des questions')
      const data = await res.json()
      setQuestions(data)
      // Générer les réponses affichées pour chaque question
      const answersArr = data.map(q => getRandomAnswers(q.options, q.correct_answer))
      setDisplayedAnswers(answersArr)
    } catch (error) {
      setError('Erreur lors du chargement des questions')
    } finally {
      setLoading(false)
    }
  }

  const handleCategory = (category) => {
    setSelectedCategory(category)
    setSelectedQuiz(null)
    setQuestions([])
    setDisplayedAnswers([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setStep(2)
  }

  const handleQuiz = (quiz) => {
    setSelectedQuiz(quiz)
    setQuestions([])
    setDisplayedAnswers([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setStep(3)
  }

  const handleAnswer = (answer, isTimeout = false) => {
    if (answeredQuestions[current]) return
    setAnsweredQuestions(prev => ({ ...prev, [current]: true }))
    if (answer === questions[current]?.correct_answer && !isTimeout) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
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
    setAnsweredQuestions({})
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedQuiz(null)
    setQuizzes([])
    setQuestions([])
    setDisplayedAnswers([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setStep(1)
  }

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null)
    setQuestions([])
    setDisplayedAnswers([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
    setStep(2)
  }

  return {
    categories,
    selectedCategory,
    quizzes,
    selectedQuiz,
    questions,
    current,
    selected,
    score,
    showScore,
    loading,
    error,
    displayedAnswers,
    step,
    handleAnswer,
    handleNext,
    handleRestart,
    handleCategory,
    handleQuiz,
    handleBackToCategories,
    handleBackToQuizzes
  }
} 