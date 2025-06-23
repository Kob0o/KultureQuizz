import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import MainMenu from '../components/layout/MainMenu'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const navigate = useNavigate()
  const { user, loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Chargement...
      </div>
    )
  }

  return (
    <div className="home">
      <Header user={user} />
      <MainMenu user={user} />
    </div>
  )
}

export default Home 