import { useState, useEffect } from 'react'

export const useCreateQuiz = (user) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [quizName, setQuizName] = useState('')
  const [quizId, setQuizId] = useState(null)
  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, () => ({
      question: '',
      options: Array.from({ length: 10 }, () => ''),
      correct_answer: ''
    }))
  )
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('http://localhost:4000/api/categories')
      if (!res.ok) throw new Error('Erreur lors du chargement des catégories')
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      setError('Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }

  // Étape 1 : création catégorie si besoin, puis passer à l'étape 2
  const handleCategoryStep = async (token) => {
    setLoading(true)
    setError(null)
    let categoryId = selectedCategory
    if (newCategory) {
      try {
        const response = await fetch('http://localhost:4000/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: newCategory, description: '', user_id: user.id }),
        })
        const createdCategory = await response.json()
        categoryId = createdCategory.id
        setSelectedCategory(categoryId)
      } catch (err) {
        setError('Erreur lors de la création de la catégorie')
        setLoading(false)
        return
      }
    }
    if (!categoryId) {
      setError('Veuillez sélectionner ou créer une catégorie.')
      setLoading(false)
      return
    }
    setStep(2)
    setLoading(false)
  }

  // Étape 2 : création du quiz, puis passer à l'étape 3
  const handleQuizStep = async (token) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:4000/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: quizName, category_id: selectedCategory, user_id: user.id }),
      })
      const createdQuiz = await response.json()
      if (!createdQuiz.id) throw new Error('Erreur lors de la création du quiz')
      setQuizId(createdQuiz.id)
      setStep(3)
    } catch (err) {
      setError('Erreur lors de la création du quiz')
    } finally {
      setLoading(false)
    }
  }

  // Étape 3 : création des questions
  const handleQuestionsStep = async (token, navigate) => {
    setLoading(true)
    setError(null)
    try {
      for (const q of questions) {
        if (q.question && q.correct_answer) {
          await fetch('http://localhost:4000/api/questions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              quiz_id: quizId,
              question: q.question,
              correct_answer: q.correct_answer,
              options: q.options.filter(opt => opt !== ''),
              image_url: '',
            }),
          })
        }
      }
      setSuccess(true)
      setLoading(false)
      navigate && navigate('/')
    } catch (err) {
      setError('Erreur lors de la création des questions')
      setLoading(false)
    }
  }

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], question: value }
    setQuestions(newQuestions)
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
  }

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].correct_answer = value
    setQuestions(newQuestions)
  }

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    newCategory,
    setNewCategory,
    quizName,
    setQuizName,
    quizId,
    questions,
    setQuestions,
    step,
    setStep,
    handleCategoryStep,
    handleQuizStep,
    handleQuestionsStep,
    handleQuestionChange,
    handleOptionChange,
    handleCorrectAnswerChange,
    loading,
    error,
    success
  }
} 