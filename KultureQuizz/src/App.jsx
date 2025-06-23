import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './config/supabase'
import Login from './pages/Login'
import Home from './pages/Home'
import Quiz from './components/Quiz'
import './App.css'
import Header from './components/Header'
import CategoryList from './components/CategoryList'
import QuestionDisplay from './components/QuestionDisplay'
import ScoreDisplay from './components/ScoreDisplay'
import { useQuiz } from './hooks/useQuiz'

function App() {
  const {
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
  } = useQuiz()

  const [session, setSession] = useState(null)

  useEffect(() => {
    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={session ? <Home /> : <Login />} 
        />
        <Route 
          path="/quiz" 
          element={session ? <Quiz /> : <Navigate to="/" />} 
        />
        <Route 
          path="/leaderboard" 
          element={session ? <div>Leaderboard (à implémenter)</div> : <Navigate to="/" />} 
        />
        <Route 
          path="/create-quiz" 
          element={session ? <div>Créer un Quiz (à implémenter)</div> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={session ? <div>Profil (à implémenter)</div> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  )
}

export default App
