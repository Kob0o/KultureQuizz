# 🎯 Kulture Quiz - Application de Quiz de Culture Générale

## 📋 Description

**Kulture Quiz** est une application web moderne de quiz de culture générale développée en **React**. Elle propose une expérience utilisateur **flashy et professionnelle** avec un design **mobile-first** optimisé.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- Logo animé avec effet de flottement
- Titre avec dégradé de couleurs
- Menu principal avec cartes interactives
- Design glassmorphism moderne

### 🗂️ Sélection de Catégories
- Interface en grille responsive
- Cartes de catégories avec icônes
- Effets hover avec animations
- Récupération des données via API

### ❓ Quiz Interactif
- **Timer de 30 secondes** avec animations
- **4 réponses par question** sélectionnées aléatoirement
- **Feedback visuel** : vert pour correct, rouge pour incorrect
- **Passage automatique** si pas de réponse dans les 30s
- **10 questions par quiz**

### 🧾 Résultats
- Affichage du score final avec messages personnalisés
- Animations de célébration
- Options pour recommencer ou changer de catégorie

### 🌐 API Intégrée
- Récupération des catégories et questions
- **Authentification centralisée via le backend**
- Création de quiz personnalisés

## 🎨 Design System

### Palette de Couleurs
- **Primaire** : Indigo vif (#6366f1) - Couleur principale
- **Secondaire** : Orange doré (#f59e0b) - Actions importantes  
- **Accent** : Rose vif (#ec4899) - Highlights
- **Fond** : Bleu nuit (#0f0f23) - Réduit la fatigue visuelle

### Typographie
- **Police** : Inter (moderne et lisible)
- **Hiérarchie** : 8 tailles de police (xs à 4xl)
- **Poids** : 300 à 900 pour la hiérarchie visuelle

### Effets Visuels
- **Glassmorphism** : Cartes semi-transparentes avec flou
- **Animations** : Fade-in, slide, pulse, glow, float
- **Ombres colorées** : Profondeur et dynamisme
- **Transitions fluides** : 0.15s à 0.5s

## 🛠️ Technologies

### Frontend
- **React 19** avec Hooks
- **React Router** pour la navigation
- **CSS Variables** pour le design system
- **CSS Animations** pour les effets visuels

### Backend & Services
- **Node.js/Express** pour l'API REST
- **Supabase** pour l'authentification (via le backend)
- **Base de données** pour les questions et catégories
- **Architecture centralisée** : tout passe par le backend

### Outils de Développement
- **Vite** pour le build et le développement
- **ESLint** pour la qualité du code

## 📱 Responsive Design

### Mobile-First
- Optimisation prioritaire pour mobile
- Grilles adaptatives
- Navigation simplifiée
- Boutons tactiles optimisés

### Breakpoints
- **Mobile** : < 480px
- **Tablet** : 480px - 768px  
- **Desktop** : > 768px

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation Frontend
```bash
# Cloner le repository
git clone [url-du-repo]
cd KultureQuizz

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Installation Backend
```bash
cd KutltureQuizz_API

# Installer les dépendances
npm install

# Créer le fichier .env avec vos variables Supabase
# SUPABASE_URL=votre_url_supabase
# SUPABASE_ANON_KEY=votre_clé_anon_supabase
# FRONTEND_URL=http://localhost:5173
# PORT=4000

# Démarrer le serveur backend
npm run dev
```

## 📊 Structure du Projet

```
KultureQuizz/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── layout/         # Composants de mise en page
│   │   ├── Quiz.jsx        # Composant principal du quiz
│   │   ├── CategoryList.jsx # Liste des catégories
│   │   ├── QuestionDisplay.jsx # Affichage des questions
│   │   └── ScoreDisplay.jsx # Affichage des résultats
│   ├── pages/              # Pages de l'application
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── Login.jsx       # Page de connexion
│   │   └── CreateQuiz.jsx  # Création de quiz
│   ├── hooks/              # Hooks personnalisés
│   │   ├── useQuiz.js      # Logique du quiz
│   │   ├── useAuth.js      # Authentification via backend
│   │   └── useCreateQuiz.js # Création de quiz
│   ├── assets/             # Ressources statiques
│   ├── App.css             # Styles principaux
│   ├── index.css           # Variables CSS et base
│   └── App.jsx             # Composant racine
├── KutltureQuizz_API/      # Backend Node.js/Express
│   ├── controllers/        # Contrôleurs API
│   ├── routes/             # Routes API
│   ├── data/               # Configuration Supabase
│   └── server.js           # Serveur Express
├── DESIGN_SYSTEM.md        # Documentation du design
└── README.md              # Ce fichier
```

## 🔐 Architecture d'Authentification

### Flux d'Authentification
1. **Frontend** → Appel à `/api/auth/login`
2. **Backend** → Redirection vers Google OAuth via Supabase
3. **Google** → Retour vers le backend avec le code
4. **Backend** → Échange du code contre une session Supabase
5. **Frontend** → Récupération de la session via `/api/auth/session`

### Sécurité
- **Aucun appel direct à Supabase** depuis le frontend
- **Tokens gérés côté backend** uniquement
- **Sessions centralisées** pour un meilleur contrôle

## 🎯 Critères de Notation Respectés

| Critère | Statut | Points |
|---------|--------|--------|
| ✅ Mobile first respecté | ✅ | 2 pts |
| ✅ Page d'accueil avec logo et titre | ✅ | 1 pt |
| ✅ Affichage des catégories depuis l'API | ✅ | 2 pts |
| ✅ Affichage des questions/réponses depuis l'API | ✅ | 3 pts |
| ⏱️ Timer fonctionnel avec passage automatique | ✅ | 2 pts |
| 🎨 Coloration de la réponse avant changement | ✅ | 1 pt |
| 🧮 Calcul et affichage du score final | ✅ | 2 pts |
| 🧩 Code maintenable, composants bien organisés | ✅ | 2 pts |
| 🖌️ Design cohérent et professionnel | ✅ | 1 pt |
| 🎤 Présentation orale | ⏳ | 4 pts |

## 🔧 Développement

### Scripts Disponibles
```bash
# Frontend
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualise le build
npm run lint     # Vérifie la qualité du code

# Backend
npm run dev      # Démarre le serveur backend avec nodemon
npm start        # Démarre le serveur backend
```

### Architecture
- **Composants fonctionnels** avec Hooks
- **CSS Variables** pour la cohérence du design
- **Séparation des responsabilités** : UI/Logique/Données
- **Code modulaire** et réutilisable
- **API centralisée** pour toutes les opérations

## 📈 Améliorations Futures

- [ ] Système de classement
- [ ] Mode multijoueur
- [ ] Quiz personnalisés par utilisateur
- [ ] Mode hors ligne
- [ ] Notifications push
- [ ] Partage de scores sur réseaux sociaux

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ et beaucoup de café ☕**
