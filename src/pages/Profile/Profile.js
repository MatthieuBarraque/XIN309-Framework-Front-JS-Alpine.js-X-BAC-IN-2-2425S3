import Navbar, { setupNavbarEvents } from '../../components/Navbar/Navbar.js';
import Footer from '../../components/Footer/Footer.js';
import { logoutUser, protectRoute } from '../../services/firebase/auth';

export default function Profile(navigate) {
  protectRoute(navigate);

  return `
    ${Navbar()}
    <div class="profile-page">
      <h1>Bienvenue sur votre profil</h1>
      <button id="logout-button" class="btn btn-danger">Se déconnecter</button>
    </div>
    ${Footer()}
  `;
}

export function setupProfileEvents() {
  const logoutButton = document.getElementById('logout-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        await logoutUser();
        alert('Vous avez été déconnecté avec succès.');
        window.location.href = '/';
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error.message);
        alert('Erreur lors de la déconnexion. Veuillez réessayer.');
      }
    });
  }

  setupNavbarEvents();
}
