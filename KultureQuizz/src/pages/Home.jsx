import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'
import Header from '../components/layout/Header'
import MainMenu from '../components/layout/MainMenu'

const Home = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          navigate('/login')
          return
        }
        setUser(session.user)
      } catch (error) {
        console.error('Error checking auth status:', error)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-white">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <Header user={user} />
      <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <MainMenu />
      </main>
    </div>
  )
}

export default Home 