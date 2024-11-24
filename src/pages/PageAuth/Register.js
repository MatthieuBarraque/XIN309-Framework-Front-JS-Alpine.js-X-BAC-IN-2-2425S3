import './Register.css';
import RegisterForm, { setupRegisterFormEvents } from '../FormAuth/RegisterForm';
import testImage from './test.png';

export default function Register() {
  return `
    <div class="register-page">
      <div class="register-left">
        <button class="back-button" onclick="window.history.back()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <img src="${testImage}" alt="Illustration" class="register-image" />
      </div>
      <div class="register-right">
        <div class="register-card">
          ${RegisterForm()}
        </div>
      </div>
    </div>
  `;
}

// Exportez correctement les événements pour `Register`
export function setupRegisterEvents() {
  setupRegisterFormEvents();
}
