import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

export const useQuiz = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayedAnswers, setDisplayedAnswers] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory)
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
      
      if (error) throw error
      setCategories(data)
    } catch (error) {
      setError('Erreur lors du chargement des catégories')
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestions = async (categoryId) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category_id', categoryId)
      
      if (error) throw error
      setQuestions(data)
    } catch (error) {
      setError('Erreur lors du chargement des questions')
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategory = (category) => {
    setSelectedCategory(category)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
  }

  const handleAnswer = (answer) => {
    setSelected(answer)
    const isCorrect = answer === questions[current].correct_answer
    if (isCorrect) {
      setScore(score + 1)
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
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setQuestions([])
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowScore(false)
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