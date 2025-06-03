const API_URL = 'http://localhost:3001/api';

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
  return res.json();
}

export async function fetchQuestions(category) {
  const res = await fetch(`${API_URL}/questions/${category}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des questions');
  return res.json();
}

export async function checkAnswer(category, questionId, answerId) {
  const res = await fetch(`${API_URL}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, questionId, answerId }),
  });
  if (!res.ok) throw new Error('Erreur lors de la vérification de la réponse');
  return res.json();
} 