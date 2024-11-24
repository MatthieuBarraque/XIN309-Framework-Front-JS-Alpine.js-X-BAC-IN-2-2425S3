import './Signin.css';
import SigninForm, { setupSigninFormEvents } from '../FormAuth/SigninForm';
import { loginUser } from '../../services/firebase/auth';
import testImage from './test.png';

export default function Signin() {
  return `
    <div class="signin-page">
      <div class="signin-left">
        <button class="back-button" onclick="window.history.back()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <img src="${testImage}" alt="Illustration" class="signin-image" />
      </div>
      <div class="signin-right">
        <div class="signin-card">
          ${SigninForm()}
        </div>
      </div>
    </div>
  `;
}

export function setupSigninFormEvents() {
  // S'assurer que le formulaire existe dans le DOM
  const signinForm = document.getElementById('signin-form');
  const errorMessage = document.getElementById('error-message');

  if (!signinForm) {
    console.error("Le formulaire 'signin-form' est introuvable dans le DOM.");
    return;
  }

  // Attacher un écouteur d'événement au formulaire
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    //ok
    // Vérification des champs vides
    if (!email || !password) {
      errorMessage.textContent = 'Veuillez remplir tous les champs.';
      errorMessage.style.display = 'block';
      return;
    }

    try {
      // Appeler la fonction de connexion Firebase
      await loginUser(email, password);

      // Rediriger vers le profil après une connexion réussie
      window.history.pushState(null, '', '/profile');
      location.reload(); // Forcer le rechargement pour initialiser la page
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
      errorMessage.style.display = 'block';
    }
  });
}
