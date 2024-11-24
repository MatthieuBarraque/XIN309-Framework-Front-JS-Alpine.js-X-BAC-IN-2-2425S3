// Code for the Profile page
import { logoutUser, protectRoute } from '../../services/firebase/auth';

export default function Profile(navigate) {
  // Protect the Profile page
  protectRoute(navigate);

  return `
    <div class="profile-page">
      <h1>Bienvenue sur votre profil</h1>
      <button id="logout-button">Se déconnecter</button>
    </div>
  `;
}

// Add event listener for logout button
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');

  logoutButton.addEventListener('click', async () => {
    try {
      await logoutUser();
      alert('Vous avez été déconnecté avec succès.');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
      alert('Erreur lors de la déconnexion.');
    }
  });
});
