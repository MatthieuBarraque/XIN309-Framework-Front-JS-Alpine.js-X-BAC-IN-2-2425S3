import './RegisterForm.css';
import { registerUser, waitForEmailVerification } from '../../services/firebase/auth';

export default function RegisterForm() {
  return `
    <form id="register-form" novalidate>
      <h2>Inscription</h2>
      <p>Créez un compte pour accéder à vos services personnalisés.</p>
      
      <div class="input-container">
        <i class="fas fa-user input-icon"></i>
        <input type="text" id="first-name" placeholder="Prénom" required />
      </div>
      
      <div class="input-container">
        <i class="fas fa-user input-icon"></i>
        <input type="text" id="last-name" placeholder="Nom" required />
      </div>
      
      <div class="input-container">
        <i class="fas fa-envelope input-icon"></i>
        <input type="email" id="email" placeholder="Adresse e-mail" required />
      </div>
      
      <div class="input-container">
        <i class="fas fa-lock input-icon"></i>
        <input type="password" id="password" placeholder="Mot de passe" required />
      </div>
      
      <div class="input-container">
        <i class="fas fa-lock input-icon"></i>
        <input type="password" id="confirm-password" placeholder="Confirmez le mot de passe" required />
      </div>
      
      <button type="submit" id="submit-button">S'inscrire</button>
      
      <div class="divider">
        <span>OU</span>
      </div>
      
      <div class="google-button">
        <i class="fab fa-google"></i> Inscription avec Google
      </div>
      
      <p class="register-text">
        Vous avez déjà un compte ? <a href="/signin" class="login-link" data-link>Connectez-vous ici</a>
      </p>
    </form>
    <div id="messages">
      <p id="loading-message" style="display: none; color: #007bff;">Veuillez patienter... un email de vérification a été envoyé.</p>
      <p id="success-message" style="display: none; color: green;">Inscription réussie ! Vérifiez votre email pour confirmer votre inscription.</p>
      <p id="error-message" style="display: none; color: red;">Erreur lors de l'inscription. Veuillez réessayer.</p>
    </div>
  `;
}

export function setupRegisterFormEvents() {
  const registerForm = document.getElementById('register-form');
  const loadingMessage = document.getElementById('loading-message');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  if (!registerForm) {
    console.error("Le formulaire 'register-form' est introuvable dans le DOM.");
    return;
  }

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      errorMessage.textContent = "Les mots de passe ne correspondent pas.";
      errorMessage.style.display = 'block';
      return;
    }

    try {
      loadingMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';

      // Inscription Firebase
      await registerUser(email, password);

      successMessage.textContent = 'Inscription réussie ! Un email de vérification a été envoyé.';
      successMessage.style.display = 'block';

      // Démarrer la vérification de l'email
      waitForEmailVerification();
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
      errorMessage.style.display = 'block';
    } finally {
      loadingMessage.style.display = 'none';
    }
  });
}
