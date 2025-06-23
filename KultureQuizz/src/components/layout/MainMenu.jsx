import { useNavigate } from 'react-router-dom'

const MainMenu = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 w-full max-w-[400px]">
      <button 
        className="py-5 px-8 text-lg font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg bg-[#ff9800] text-white uppercase tracking-wider hover:bg-[#ff7300]"
        onClick={() => navigate('/quiz')}
      >
        Jouer
      </button>
      
      <button 
        className="py-5 px-8 text-lg font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white/10 text-white border-2 border-white/20 uppercase tracking-wider hover:bg-white/20"
        onClick={() => navigate('/leaderboard')}
      >
        Classement
      </button>
      
      <button 
        className="py-5 px-8 text-lg font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white/10 text-white border-2 border-white/20 uppercase tracking-wider hover:bg-white/20"
        onClick={() => navigate('/create-quiz')}
      >
        Créer un Quiz
      </button>
    </div>
  )
}

export default MainMenu 