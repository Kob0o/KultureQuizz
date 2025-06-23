import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { user, loading, login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error('Erreur de connexion:', error)
    }
  }

  return (
    <div className="home">
      <div className="home-content" style={{ maxWidth: '400px' }}>
        <img 
          src="/src/assets/img/ChatGPT Image 16 mai 2025, 10_17_21.png" 
          alt="Kulture Quiz Logo" 
          className="home-logo"
        />
        <h1 className="home-title">Kulture Quiz</h1>
        <p className="home-subtitle">
          Connecte-toi pour jouer, créer et défier tes amis !
        </p>
        <div className="card card-glow">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png?20230822192911" 
              alt="Google" 
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: '2px',
                marginRight: '8px'
              }}
            />
            {loading ? 'Connexion...' : 'Se connecter avec Google'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login 