import './SigninForm.css';
import { loginUser } from '../../services/firebase/auth';

export default function SigninForm() {
  return `
    <form id="signin-form" novalidate>
      <h2>Connexion</h2>
      <p>Connectez-vous à votre espace personnel pour accéder à vos services.</p>
      
      <div class="input-container">
        <i class="fas fa-envelope input-icon"></i>
        <input type="email" id="email" placeholder="Adresse e-mail" required />
      </div>
      
      <div class="input-container">
        <i class="fas fa-lock input-icon"></i>
        <input type="password" id="password" placeholder="Mot de passe" required />
      </div>
      
      <div class="form-actions">
        <label>
          <input type="checkbox" id="remember-me" /> Rester connecté
        </label>
        <a href="#" class="forgot-password">Mot de passe oublié ?</a>
      </div>
      
      <button type="submit" id="signin-button">Se connecter</button>
      
      <div class="divider">
        <span>OU</span>
      </div>
      
      <div class="google-button">
        <i class="fab fa-google"></i> Connexion avec Google
      </div>
      
      <p class="register-text">
        Pas encore inscrit ? <a href="/register" class="register-link" data-link>Créez un compte</a>
      </p>
    </form>
    <p id="error-message" style="display: none; color: red;">Erreur lors de la connexion.</p>
  `;
}

export function setupSigninFormEvents() {
  const signinForm = document.getElementById('signin-form');
  const errorMessage = document.getElementById('error-message');

  if (!signinForm) {
    console.error("Le formulaire 'signin-form' est introuvable dans le DOM.");
    return;
  }

  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      errorMessage.textContent = 'Veuillez remplir tous les champs.';
      errorMessage.style.display = 'block';
      return;
    }

    try {
      await loginUser(email, password);
      window.location.href = '/profile'; // Redirection après connexion réussie
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
      errorMessage.style.display = 'block';
    }
  });
}
