import './Register.css';
import RegisterForm from '../FormAuth/RegisterForm';
import testImage from './test.png'; // Import direct de l'image via Webpack

export default function Register() {
  return `
    <div class="register-page">
      <!-- Section gauche -->
      <div class="register-left">
        <button class="back-button" onclick="window.history.back()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <img src="${testImage}" alt="Illustration" class="register-image" />
      </div>

      <!-- Section droite -->
      <div class="register-right">
        <div class="register-card">
          ${RegisterForm()}
        </div>
      </div>
    </div>
  `;
}

//ok