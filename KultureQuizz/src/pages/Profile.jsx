import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const navigate = useNavigate()
  const { user, loading, isAuthenticated, logout, token } = useAuth()
  const [userStats, setUserStats] = useState(null)
  const [userBadges, setUserBadges] = useState([])
  const [loadingStats, setLoadingStats] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    if (user && isAuthenticated && token) {
      fetchUserStats()
      fetchUserBadges()
    }
  }, [user, isAuthenticated, token])

  const fetchUserStats = async () => {
    try {
      setLoadingStats(true)
      const response = await fetch(`http://localhost:4000/api/leaderboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserStats(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  const fetchUserBadges = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/leaderboard/badges/${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setUserBadges(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des badges:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      // Rediriger directement vers la page de connexion
      window.location.href = '/login'
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      // En cas d'erreur, rediriger quand même
      window.location.href = '/login'
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Chargement...
      </div>
    )
  }

  return (
    <div className="home" style={{minHeight:'100vh'}}>
      <div className="home-content" style={{maxWidth:'800px', width:'100%'}}>
        <button 
          className="btn btn-outline" 
          style={{marginBottom:'var(--spacing-6)', alignSelf:'flex-start'}} 
          onClick={() => navigate('/')}
        >
          🏠 Accueil
        </button>
        
        <h1 className="home-title" style={{marginBottom:'var(--spacing-8)'}}>👤 Mon Profil</h1>

        {/* Informations utilisateur */}
        <div className="card" style={{marginBottom:'var(--spacing-6)'}}>
          <div style={{display:'flex', alignItems:'center', gap:'var(--spacing-6)', marginBottom:'var(--spacing-6)'}}>
            <img 
              src={user?.user_metadata?.picture}
              alt="Photo de profil"
              style={{
                width:'80px',
                height:'80px',
                borderRadius:'50%',
                objectFit:'cover',
                border:'3px solid var(--primary)'
              }}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 style={{color:'var(--text-primary)', marginBottom:'var(--spacing-2)'}}>
                {user?.user_metadata?.name || 'Utilisateur'}
              </h2>
              <p style={{color:'var(--text-secondary)', marginBottom:'var(--spacing-4)'}}>
                {user?.email}
              </p>
              <button 
                className="btn btn-outline"
                onClick={handleLogout}
                style={{fontSize:'var(--font-size-sm)'}}
              >
                🚪 Se déconnecter
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques simplifiées */}
        <div className="card" style={{marginBottom:'var(--spacing-6)'}}>
          <h3 style={{marginBottom:'var(--spacing-6)', color:'var(--primary)', textAlign:'center'}}>
            📊 Mes Statistiques
          </h3>
          
          {loadingStats ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              Chargement des statistiques...
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'var(--spacing-4)'}}>
              <div style={{textAlign:'center', padding:'var(--spacing-4)', backgroundColor:'rgba(255,255,255,0.05)', borderRadius:'var(--border-radius-lg)'}}>
                <div style={{fontSize:'var(--font-size-2xl)', fontWeight:'bold', color:'var(--primary)', marginBottom:'var(--spacing-2)'}}>
                  {userStats?.total_quizzes || 0}
                </div>
                <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>Quiz complétés</div>
              </div>
              
              <div style={{textAlign:'center', padding:'var(--spacing-4)', backgroundColor:'rgba(255,255,255,0.05)', borderRadius:'var(--border-radius-lg)'}}>
                <div style={{fontSize:'var(--font-size-2xl)', fontWeight:'bold', color:'var(--primary)', marginBottom:'var(--spacing-2)'}}>
                  {userStats?.average_percentage || 0}%
                </div>
                <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>Moyenne réussite</div>
              </div>
              
              <div style={{textAlign:'center', padding:'var(--spacing-4)', backgroundColor:'rgba(255,255,255,0.05)', borderRadius:'var(--border-radius-lg)'}}>
                <div style={{fontSize:'var(--font-size-2xl)', fontWeight:'bold', color:'var(--primary)', marginBottom:'var(--spacing-2)'}}>
                  {userStats?.unique_categories || 0}
                </div>
                <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>Catégories jouées</div>
              </div>
              
              <div style={{textAlign:'center', padding:'var(--spacing-4)', backgroundColor:'rgba(255,255,255,0.05)', borderRadius:'var(--border-radius-lg)'}}>
                <div style={{fontSize:'var(--font-size-2xl)', fontWeight:'bold', color:'var(--primary)', marginBottom:'var(--spacing-2)'}}>
                  {userBadges.length}
                </div>
                <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>Badges obtenus</div>
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="card">
          <h3 style={{marginBottom:'var(--spacing-6)', color:'var(--primary)', textAlign:'center'}}>
            🏅 Mes Badges
          </h3>
          
          {userBadges.length === 0 ? (
            <div style={{textAlign:'center', padding:'var(--spacing-8)'}}>
              <div style={{fontSize:'var(--font-size-4xl)', marginBottom:'var(--spacing-4)'}}>🏆</div>
              <p style={{color:'var(--text-secondary)', marginBottom:'var(--spacing-4)'}}>
                Vous n'avez pas encore de badges.
              </p>
              <p style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>
                Jouez à des quiz pour débloquer des achievements !
              </p>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'var(--spacing-4)'}}>
              {userBadges.map(badge => (
                <div 
                  key={badge.id}
                  style={{
                    padding:'var(--spacing-4)',
                    backgroundColor:'rgba(255,255,255,0.05)',
                    borderRadius:'var(--border-radius-lg)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    textAlign:'center'
                  }}
                >
                  <div style={{fontSize:'var(--font-size-3xl)', marginBottom:'var(--spacing-3)'}}>
                    {badge.icon}
                  </div>
                  <div style={{fontWeight:'bold', color:'var(--text-primary)', marginBottom:'var(--spacing-2)'}}>
                    {badge.name}
                  </div>
                  <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-sm)', marginBottom:'var(--spacing-3)'}}>
                    {badge.description}
                  </div>
                  <div style={{color:'var(--text-secondary)', fontSize:'var(--font-size-xs)'}}>
                    Obtenu le {new Date(badge.earned_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 