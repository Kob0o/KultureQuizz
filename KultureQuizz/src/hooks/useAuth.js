import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Récupérer la session au chargement
  useEffect(() => {
    // Toujours vérifier la session au chargement initial
    checkSession()
  }, [])

  // Écouter les changements de localStorage pour le token (seulement entre onglets)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token') {
        checkSession()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const checkSession = async () => {
    try {
      setLoading(true)
      
      // Vérifier s'il y a un token en localStorage
      const storedToken = localStorage.getItem('auth_token')
      
      if (storedToken) {
        const response = await fetch('http://localhost:4000/api/auth/session', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setToken(data.access_token)
          setIsAuthenticated(true)
          // Mettre à jour le token en localStorage
          localStorage.setItem('auth_token', data.access_token)
        } else {
          // Token invalide, le supprimer
          localStorage.removeItem('auth_token')
          setUser(null)
          setToken(null)
          setIsAuthenticated(false)
        }
      } else {
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de session:', error)
      localStorage.removeItem('auth_token')
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        // Rediriger vers Google OAuth
        window.location.href = data.url
      } else {
        throw new Error('Erreur lors de la connexion')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        localStorage.removeItem('auth_token')
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
      } else {
        throw new Error('Erreur lors de la déconnexion')
      }
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      // Même en cas d'erreur, on supprime le token local
      localStorage.removeItem('auth_token')
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    checkSession
  }
} 