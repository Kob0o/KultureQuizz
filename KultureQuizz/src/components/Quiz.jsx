import { useQuiz } from '../hooks/useQuiz'
import Header from './Header'
import CategoryList from './CategoryList'
import QuestionDisplay from './QuestionDisplay'
import ScoreDisplay from './ScoreDisplay'

const Quiz = () => {
  const {
    categories,
    selectedCategory,
    questions,
    current,
    selected,
    score,
    showScore,
    loading,
    error,
    displayedAnswers,
    handleAnswer,
    handleNext,
    handleRestart,
    handleCategory,
    handleBackToCategories
  } = useQuiz()

  return (
    <div className="container">
      <Header />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : !selectedCategory ? (
        <CategoryList 
          categories={categories} 
          onSelectCategory={handleCategory} 
        />
      ) : showScore ? (
        <ScoreDisplay 
          score={score} 
          totalQuestions={questions.length} 
          onRestart={handleRestart} 
          onBackToCategories={handleBackToCategories} 
        />
      ) : (
        <QuestionDisplay 
          question={questions[current]}
          displayedAnswers={displayedAnswers}
          selectedAnswer={selected}
          onSelectAnswer={handleAnswer}
          onNext={handleNext}
          onBackToCategories={handleBackToCategories}
          current={current}
          totalQuestions={questions.length}
        />
      )}
    </div>
  )
}

export default Quiz 