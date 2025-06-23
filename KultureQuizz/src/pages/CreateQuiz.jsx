import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateQuiz } from '../hooks/useCreateQuiz';
import { useAuth } from '../hooks/useAuth';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { user, token, loading: authLoading, isAuthenticated } = useAuth();
  const quiz = useCreateQuiz(user);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || !user) return null;

  // Étape 1 : Choix/création catégorie
  if (quiz.step === 1) {
    return (
      <div className="home" style={{minHeight:'100vh'}}>
        <div className="home-content" style={{maxWidth:'700px', width:'100%'}}>
          <button 
            className="btn btn-outline" 
            style={{marginBottom:'var(--spacing-6)', alignSelf:'flex-start'}} 
            onClick={() => navigate('/')}
          >
            🏠 Accueil
          </button>
          <h1 className="home-title" style={{marginBottom:'var(--spacing-8)'}}>Créer un nouveau quiz</h1>
          {quiz.error && (
            <div className="error-message">{quiz.error}</div>
          )}
          <form onSubmit={e => { e.preventDefault(); quiz.handleCategoryStep(token); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
            <div className="card">
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>Catégorie</h2>
              <select
                value={quiz.selectedCategory}
                onChange={e => quiz.setSelectedCategory(e.target.value)}
                style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', width: '100%', marginBottom: 'var(--spacing-3)', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
              >
                <option value="">Sélectionner une catégorie existante</option>
                {quiz.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <p style={{ textAlign: 'center', margin: 'var(--spacing-3) 0', color: 'var(--text-secondary)' }}>OU</p>
              <input
                type="text"
                placeholder="Créer une nouvelle catégorie"
                value={quiz.newCategory}
                onChange={e => quiz.setNewCategory(e.target.value)}
                style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', width: '100%', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={quiz.loading}>
                {quiz.loading ? 'Création en cours...' : 'Continuer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Étape 2 : Saisie nom du quiz
  if (quiz.step === 2) {
    return (
      <div className="home" style={{minHeight:'100vh'}}>
        <div className="home-content" style={{maxWidth:'700px', width:'100%'}}>
          <button 
            className="btn btn-outline" 
            style={{marginBottom:'var(--spacing-6)', alignSelf:'flex-start'}} 
            onClick={() => navigate('/')}
          >
            🏠 Accueil
          </button>
          <h1 className="home-title" style={{marginBottom:'var(--spacing-8)'}}>Nom du quiz</h1>
          {quiz.error && (
            <div className="error-message">{quiz.error}</div>
          )}
          <form onSubmit={e => { e.preventDefault(); quiz.handleQuizStep(token); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
            <div className="card">
              <input
                type="text"
                placeholder="Nom du quiz"
                value={quiz.quizName}
                onChange={e => quiz.setQuizName(e.target.value)}
                style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', width: '100%', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={quiz.loading}>
                {quiz.loading ? 'Création en cours...' : 'Continuer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Étape 3 : Création des questions
  return (
    <div className="home" style={{minHeight:'100vh'}}>
      <div className="home-content" style={{maxWidth:'700px', width:'100%'}}>
        <button 
          className="btn btn-outline" 
          style={{marginBottom:'var(--spacing-6)', alignSelf:'flex-start'}} 
          onClick={() => navigate('/')}
        >
          🏠 Accueil
        </button>
        <h1 className="home-title" style={{marginBottom:'var(--spacing-8)'}}>Questions du quiz</h1>
        {quiz.error && (
          <div className="error-message">{quiz.error}</div>
        )}
        {quiz.success && (
          <div className="score-text" style={{color:'var(--success)', marginBottom:'2rem'}}>Quiz créé avec succès !</div>
        )}
        <form onSubmit={e => { e.preventDefault(); quiz.handleQuestionsStep(token, navigate); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="card">
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '700', marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
                Question {qIndex + 1}
              </h3>
              <input
                type="text"
                placeholder={`Texte de la question ${qIndex + 1}`}
                value={q.question}
                onChange={e => quiz.handleQuestionChange(qIndex, e.target.value)}
                style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', width: '100%', marginBottom: 'var(--spacing-4)', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                {Array.from({ length: 10 }).map((_, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Proposition ${oIndex + 1}`}
                    value={q.options[oIndex]}
                    onChange={e => quiz.handleOptionChange(qIndex, oIndex, e.target.value)}
                    style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Bonne réponse (doit correspondre à une proposition)"
                value={q.correct_answer}
                onChange={e => quiz.handleCorrectAnswerChange(qIndex, e.target.value)}
                style={{ padding: 'var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--border-radius-lg)', width: '100%', backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}
                required
              />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary" disabled={quiz.loading}>
              {quiz.loading ? 'Création en cours...' : 'Créer le quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz; 