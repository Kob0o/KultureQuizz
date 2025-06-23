import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateQuiz from './pages/CreateQuiz'
import Quiz from './components/Quiz'
import AuthCallback from './pages/AuthCallback'
import Profile from './pages/Profile'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const { user, loading, isAuthenticated } = useAuth()

  // Afficher un loader pendant le chargement de l'authentification
  if (loading) {
    return (
      <div className="home" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className="card card-glow" style={{textAlign:'center', padding:'var(--spacing-8)'}}>
          <div className="loading-spinner"></div>
          <p style={{marginTop:'var(--spacing-4)', color:'var(--text-secondary)'}}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Login />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/auth/callback" 
          element={<AuthCallback />} 
        />
        <Route 
          path="/quiz" 
          element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} 
        />
        <Route 
          path="/create-quiz" 
          element={isAuthenticated ? <CreateQuiz /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  )
}

export default App
