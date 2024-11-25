// Quiz.js

import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';
import QuizCreationForm from '../components/QuizCreationForm/QuizCreationForm.js';
import { auth } from '../services/firebase/firebaseConfig.js';

export default function Quiz() {
  const user = auth.currentUser;

  if (!user) {
    window.location.href = '/signin';
    return '';
  }

  return `
    ${Navbar()}
    <main class="quiz-main">
      ${QuizCreationForm()}
    </main>
    ${Footer()}
  `;
}
