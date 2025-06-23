import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabase'

const Header = ({ user }) => {
  const navigate = useNavigate()

  return (
    <header className="flex justify-between items-center py-4 mb-12">
      <h1 className="text-white text-4xl font-bold m-0 drop-shadow-md">
        Kulture Quizz
      </h1>
      <div className="relative">
        <button 
          className="bg-transparent border-none p-0 cursor-pointer transition-transform hover:scale-110"
          onClick={() => navigate('/profile')}
        >
          <img 
            src={user?.user_metadata?.picture} 
            alt="Profile" 
            className="w-[50px] h-[50px] rounded-full border-2 border-[#ff9800] shadow-lg object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  )
}

export default Header 