-- DROP des anciennes tables si elles existent
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS leaderboard CASCADE;
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;

-- Table des catégories
CREATE TABLE categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    user_id uuid NOT NULL
);

-- Table des quizzes
CREATE TABLE quizzes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    user_id uuid NOT NULL,
    category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- Table des questions
CREATE TABLE questions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
    question text NOT NULL,
    correct_answer text NOT NULL,
    options text[] NOT NULL,
    image_url text,
    created_at timestamptz DEFAULT now()
);

-- Table des scores (leaderboard)
CREATE TABLE leaderboard (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    quiz_id uuid NOT NULL,
    category_id uuid NOT NULL,
    score integer NOT NULL,
    max_score integer NOT NULL,
    percentage decimal(5,2) NOT NULL,
    completed_at timestamptz DEFAULT now()
);

-- Table des badges
CREATE TABLE badges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    criteria_type text NOT NULL, -- 'quiz_count', 'perfect_score', 'unique_quizzes', etc.
    criteria_value integer NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Table de liaison utilisateur-badges
CREATE TABLE user_badges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
    earned_at timestamptz DEFAULT now()
);

-- Index pour accélérer les recherches
CREATE INDEX idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX idx_quizzes_user_id ON quizzes(user_id);
CREATE INDEX idx_leaderboard_user_id ON leaderboard(user_id);
CREATE INDEX idx_leaderboard_category_id ON leaderboard(category_id);
CREATE INDEX idx_leaderboard_completed_at ON leaderboard(completed_at);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

-- Insérer quelques badges par défaut
INSERT INTO badges (name, description, icon, criteria_type, criteria_value) VALUES
('Premier Quiz', 'Complétez votre premier quiz', '🎯', 'quiz_count', 1),
('Quiz Master', 'Complétez 10 quiz', '🏆', 'quiz_count', 10),
('Perfectionniste', 'Obtenez 5 scores parfaits', '⭐', 'perfect_score', 5),
('Explorateur', 'Jouez à 5 catégories différentes', '🗺️', 'unique_quizzes', 5),
('Champion', 'Obtenez 10 scores parfaits', '👑', 'perfect_score', 10),
('Polyvalent', 'Jouez à 10 catégories différentes', '🌟', 'unique_quizzes', 10); 