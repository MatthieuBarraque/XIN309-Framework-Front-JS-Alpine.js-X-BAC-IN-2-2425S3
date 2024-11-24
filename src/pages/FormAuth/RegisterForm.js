import './RegisterForm.css';
import { registerUser, waitForEmailVerification } from '../../services/firebase/auth';

export default function RegisterForm() {
  return `
    <form id="register-form" novalidate>
      <h2>Inscription</h2>
      <p>Créez un compte pour accéder à vos services personnalisés.</p>
      
      <!-- Champ Prénom -->
      <div class="input-container">
        <i class="fas fa-user input-icon"></i>
        <input type="text" id="first-name" placeholder="Prénom" required />
      </div>
      
      <!-- Champ Nom -->
      <div class="input-container">
        <i class="fas fa-user input-icon"></i>
        <input type="text" id="last-name" placeholder="Nom" required />
      </div>
      
      <!-- Champ Email -->
      <div class="input-container">
        <i class="fas fa-envelope input-icon"></i>
        <input type="email" id="email" placeholder="Adresse e-mail" required />
      </div>
      
      <!-- Champ Mot de Passe -->
      <div class="input-container">
        <i class="fas fa-lock input-icon"></i>
        <input type="password" id="password" placeholder="Mot de passe" required />
      </div>
      
      <!-- Champ Confirmation Mot de Passe -->
      <div class="input-container">
        <i class="fas fa-lock input-icon"></i>
        <input type="password" id="confirm-password" placeholder="Confirmez le mot de passe" required />
      </div>
      
      <!-- Bouton Inscription -->
      <button type="submit" id="submit-button">S'inscrire</button>
      
      <!-- Séparateur OU -->
      <div class="divider">
        <span>OU</span>
      </div>
      
      <!-- Bouton Google -->
      <div class="google-button">
        <i class="fab fa-google"></i> Inscription avec Google
      </div>
      
      <!-- Lien Connexion -->
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

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loadingMessage = document.getElementById('loading-message');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      errorMessage.textContent = "Les mots de passe ne correspondent pas.";
      errorMessage.style.display = 'block';
      return;
    }

    try {
      //ok
      // Display loading message
      loadingMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';

      // Register user
      await registerUser(email, password);

      successMessage.style.display = 'block';
      successMessage.textContent = 'Inscription réussie ! Un email de vérification a été envoyé.';

      // Start listening for email verification
      waitForEmailVerification();
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
      errorMessage.style.display = 'block';
    } finally {
      // Hide loading message
      loadingMessage.style.display = 'none';
    }
  });
});
