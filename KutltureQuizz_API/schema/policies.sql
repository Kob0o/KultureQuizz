-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- POLICIES POUR CATEGORIES
-- Tout le monde peut voir les catégories
DROP POLICY IF EXISTS "Public SELECT categories" ON categories;
CREATE POLICY "Public SELECT categories" ON categories
FOR SELECT USING (true);

-- Seul un utilisateur authentifié peut créer une catégorie
DROP POLICY IF EXISTS "Authenticated INSERT categories" ON categories;
CREATE POLICY "Authenticated INSERT categories" ON categories
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Seul le créateur peut modifier/supprimer sa catégorie
DROP POLICY IF EXISTS "Owner UPDATE categories" ON categories;
CREATE POLICY "Owner UPDATE categories" ON categories
FOR UPDATE USING (auth.uid()::uuid = user_id);

DROP POLICY IF EXISTS "Owner DELETE categories" ON categories;
CREATE POLICY "Owner DELETE categories" ON categories
FOR DELETE USING (auth.uid()::uuid = user_id);

-- POLICIES POUR QUIZZES
-- Tout le monde peut voir les quizzes
DROP POLICY IF EXISTS "Public SELECT quizzes" ON quizzes;
CREATE POLICY "Public SELECT quizzes" ON quizzes
FOR SELECT USING (true);

-- Seul un utilisateur authentifié peut créer un quiz
DROP POLICY IF EXISTS "Authenticated INSERT quizzes" ON quizzes;
CREATE POLICY "Authenticated INSERT quizzes" ON quizzes
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid()::uuid);

-- Seul le créateur peut modifier/supprimer son quiz
DROP POLICY IF EXISTS "Owner UPDATE quizzes" ON quizzes;
CREATE POLICY "Owner UPDATE quizzes" ON quizzes
FOR UPDATE USING (user_id = auth.uid()::uuid);

DROP POLICY IF EXISTS "Owner DELETE quizzes" ON quizzes;
CREATE POLICY "Owner DELETE quizzes" ON quizzes
FOR DELETE USING (user_id = auth.uid()::uuid);

-- POLICIES POUR QUESTIONS
-- Tout le monde peut voir les questions
DROP POLICY IF EXISTS "Public SELECT questions" ON questions;
CREATE POLICY "Public SELECT questions" ON questions
FOR SELECT USING (true);

-- Seul le créateur du quiz peut ajouter des questions à son quiz
DROP POLICY IF EXISTS "Quiz owner INSERT questions" ON questions;
CREATE POLICY "Quiz owner INSERT questions" ON questions
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM quizzes q WHERE q.id = quiz_id AND q.user_id = auth.uid()::uuid
  )
);

-- Seul le créateur du quiz peut modifier/supprimer ses questions
DROP POLICY IF EXISTS "Quiz owner UPDATE questions" ON questions;
CREATE POLICY "Quiz owner UPDATE questions" ON questions
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM quizzes q WHERE q.id = quiz_id AND q.user_id = auth.uid()::uuid
  )
);

DROP POLICY IF EXISTS "Quiz owner DELETE questions" ON questions;
CREATE POLICY "Quiz owner DELETE questions" ON questions
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM quizzes q WHERE q.id = quiz_id AND q.user_id = auth.uid()::uuid
  )
);

-- POLICIES POUR LEADERBOARD
-- Tout le monde peut voir les scores (pour le classement)
DROP POLICY IF EXISTS "Public SELECT leaderboard" ON leaderboard;
CREATE POLICY "Public SELECT leaderboard" ON leaderboard
FOR SELECT USING (true);

-- Seul un utilisateur authentifié peut ajouter son propre score
DROP POLICY IF EXISTS "Authenticated INSERT leaderboard" ON leaderboard;
CREATE POLICY "Authenticated INSERT leaderboard" ON leaderboard
FOR INSERT WITH CHECK (auth.uid()::uuid = user_id);

-- Seul l'utilisateur peut modifier/supprimer ses propres scores
DROP POLICY IF EXISTS "Owner UPDATE leaderboard" ON leaderboard;
CREATE POLICY "Owner UPDATE leaderboard" ON leaderboard
FOR UPDATE USING (auth.uid()::uuid = user_id);

DROP POLICY IF EXISTS "Owner DELETE leaderboard" ON leaderboard;
CREATE POLICY "Owner DELETE leaderboard" ON leaderboard
FOR DELETE USING (auth.uid()::uuid = user_id);

-- POLICIES POUR BADGES
-- Tout le monde peut voir les badges disponibles
DROP POLICY IF EXISTS "Public SELECT badges" ON badges;
CREATE POLICY "Public SELECT badges" ON badges
FOR SELECT USING (true);

-- POLICIES POUR USER_BADGES
-- Tout le monde peut voir les badges des utilisateurs
DROP POLICY IF EXISTS "Public SELECT user_badges" ON user_badges;
CREATE POLICY "Public SELECT user_badges" ON user_badges
FOR SELECT USING (true);

-- Seul un utilisateur authentifié peut recevoir des badges
DROP POLICY IF EXISTS "Authenticated INSERT user_badges" ON user_badges;
CREATE POLICY "Authenticated INSERT user_badges" ON user_badges
FOR INSERT WITH CHECK (auth.uid()::uuid = user_id);

-- Seul l'utilisateur peut supprimer ses propres badges
DROP POLICY IF EXISTS "Owner DELETE user_badges" ON user_badges;
CREATE POLICY "Owner DELETE user_badges" ON user_badges
FOR DELETE USING (auth.uid()::uuid = user_id); 