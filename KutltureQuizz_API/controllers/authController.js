const { createClient } = require('@supabase/supabase-js');

// Initialiser le client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Login avec Google OAuth
const login = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ 
      success: true, 
      message: 'Redirection vers Google...',
      url: data.url 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Supprimer les cookies de session
    res.clearCookie('sb-access-token');
    res.clearCookie('sb-refresh-token');
    
    res.json({ success: true, message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};

// Récupérer la session actuelle
const getSession = async (req, res) => {
  try {
    // Récupérer le token depuis les headers ou cookies
    const authHeader = req.headers.authorization;
    const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    let session;
    
    if (accessToken) {
      // Utiliser le token fourni
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error) throw error;
      session = { user: data.user, access_token: accessToken };
    } else {
      // Essayer de récupérer la session depuis Supabase
      const { data: { session: supabaseSession }, error } = await supabase.auth.getSession();
      if (error) throw error;
      session = supabaseSession;
    }

    if (!session) {
      return res.status(401).json({ error: 'Aucune session active' });
    }

    res.json({
      user: session.user,
      access_token: session.access_token,
      refresh_token: session.refresh_token
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(401).json({ error: 'Session invalide' });
  }
};

// Callback pour OAuth (optionnel, pour gérer le retour de Google)
const handleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Code d\'autorisation manquant' });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Rediriger vers le frontend avec les tokens
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}?session=${encodeURIComponent(JSON.stringify(data))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ error: 'Erreur lors du traitement du callback' });
  }
};

module.exports = {
  login,
  logout,
  getSession,
  handleCallback
}; 