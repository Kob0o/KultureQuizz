import { useQuiz } from '../hooks/useQuiz'
import { useNavigate } from 'react-router-dom'
import Header from './layout/Header'
import CategoryList from './CategoryList'
import QuestionDisplay from './QuestionDisplay'
import ScoreDisplay from './ScoreDisplay'

const Quiz = () => {
  const navigate = useNavigate()
  const {
    categories,
    selectedCategory,
    quizzes,
    selectedQuiz,
    questions,
    current,
    selected,
    score,
    showScore,
    loading,
    error,
    displayedAnswers,
    step,
    handleAnswer,
    handleNext,
    handleRestart,
    handleCategory,
    handleQuiz,
    handleBackToCategories,
    handleBackToQuizzes
  } = useQuiz()

  return (
    <div className="home" style={{minHeight:'100vh'}}>
      <div className="home-content" style={{maxWidth:'700px', width:'100%'}}>
        {step < 3 && <Header />}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            Chargement...
          </div>
        ) : step === 1 ? (
          <div>
            <button 
              className="btn btn-outline" 
              style={{marginBottom:'var(--spacing-6)', alignSelf:'flex-start'}} 
              onClick={() => navigate('/')}
            >
              🏠 Accueil
            </button>
            <CategoryList 
              categories={categories} 
              onSelectCategory={handleCategory} 
            />
          </div>
        ) : step === 2 ? (
          <div>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => navigate('/')}
              >
                🏠 Accueil
              </button>
              <button className="btn btn-outline" onClick={handleBackToCategories}>📁 Catégories</button>
            </div>
            <h2 style={{marginBottom:'1rem'}}>Sélectionne un quiz dans la catégorie : <span style={{color:'var(--primary)'}}>{selectedCategory?.name || ''}</span></h2>
            {quizzes.length === 0 ? (
              <div>Aucun quiz disponible dans cette catégorie.</div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                {quizzes.map(quiz => (
                  <button key={quiz.id} className="btn btn-secondary" onClick={() => handleQuiz(quiz)}>
                    {quiz.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : showScore ? (
          <div>
            <button 
              className="btn btn-outline" 
              style={{marginBottom:'var(--spacing-4)', alignSelf:'flex-start'}} 
              onClick={() => navigate('/')}
            >
              🏠 Accueil
            </button>
            <ScoreDisplay 
              score={score} 
              totalQuestions={questions.length} 
              onRestart={handleRestart} 
              onBackToCategories={handleBackToCategories}
              quizId={selectedQuiz?.id}
              categoryId={selectedCategory?.id}
            />
          </div>
        ) : (
          <div>
            <QuestionDisplay 
              question={questions[current]}
              displayedAnswers={displayedAnswers}
              selectedAnswer={selected}
              onSelectAnswer={handleAnswer}
              onNext={handleNext}
              onBackToCategories={handleBackToCategories}
              current={current}
              totalQuestions={questions.length}
              showScore={showScore}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz 