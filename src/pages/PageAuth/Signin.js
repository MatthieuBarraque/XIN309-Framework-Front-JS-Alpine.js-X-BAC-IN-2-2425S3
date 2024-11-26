import './Signin.css';
import SigninForm, { setupSigninFormEvents as setupFormEvents } from '../FormAuth/SigninForm';
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
  setupFormEvents();
}
