import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extraire le token de l'URL (après le #)
        const hash = location.hash.substring(1); // Enlever le #
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresAt = params.get('expires_at');

        if (!accessToken) {
          throw new Error('Token d\'accès manquant');
        }

        // Sauvegarder le token en localStorage
        localStorage.setItem('auth_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        if (expiresAt) {
          localStorage.setItem('expires_at', expiresAt);
        }

        // Vérifier que le token est valide en appelant le backend
        const response = await fetch('http://localhost:4000/api/auth/session', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Authentification réussie:', data.user.email);
          
          // Forcer la mise à jour de l'état d'authentification
          // en déclenchant un événement storage pour que useAuth le détecte
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'auth_token',
            newValue: accessToken,
            url: window.location.href
          }));
          
          // Attendre un peu pour s'assurer que l'événement est traité
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Rediriger vers la page d'accueil
          navigate('/', { replace: true });
        } else {
          throw new Error('Token invalide');
        }

      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error);
        setError('Erreur lors de la connexion. Veuillez réessayer.');
        // Rediriger vers la page de login après 3 secondes
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (error) {
    return (
      <div className="home" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className="card card-glow" style={{textAlign:'center', padding:'var(--spacing-8)'}}>
          <div className="error-message" style={{marginBottom:'var(--spacing-4)'}}>
            {error}
          </div>
          <p style={{color:'var(--text-secondary)'}}>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className="card card-glow" style={{textAlign:'center', padding:'var(--spacing-8)'}}>
        <div className="loading-spinner"></div>
        <p style={{marginTop:'var(--spacing-4)', color:'var(--text-secondary)'}}>
          Connexion en cours...
        </p>
      </div>
    </div>
  );
};

export default AuthCallback; 