import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md shadow-2xl text-center w-full max-w-[400px]">
        <h1 className="text-white text-4xl font-bold mb-4">
          Kulture Quizz
        </h1>
        <p className="text-white/80 mb-8">
          Connectez-vous pour commencer à jouer
        </p>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-4 border border-red-500/20">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-gray-800 py-4 px-8 rounded-lg text-base font-medium cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          {loading ? 'Connexion...' : 'Se connecter avec Google'}
        </button>
      </div>
    </div>
  )
}

export default Login 