import { useNavigate } from 'react-router-dom'

const MainMenu = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className="main-menu">
      <div className="menu-item" onClick={() => navigate('/quiz')}>
        <span className="menu-item-icon" role="img" aria-label="quiz">🎲</span>
        <div className="menu-item-title">Jouer</div>
        <div className="menu-item-description">Testez vos connaissances avec nos quiz</div>
      </div>
      
      <div className="menu-item" onClick={() => navigate('/create-quiz')}>
        <span className="menu-item-icon" role="img" aria-label="créer">✏️</span>
        <div className="menu-item-title">Créer un Quiz</div>
        <div className="menu-item-description">Partagez vos connaissances avec la communauté</div>
      </div>
      
      {user && (
        <div className="menu-item" onClick={() => navigate('/profile')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem'}}>
          <img 
            src={user.user_metadata?.picture}
            alt="Profil utilisateur"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              background: '#fff',
              objectFit: 'cover'
            }}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="menu-item-title">{user.user_metadata?.name || 'Profil'}</div>
          <div className="menu-item-description">Gérez votre compte et vos statistiques</div>
        </div>
      )}
    </div>
  )
}

export default MainMenu 