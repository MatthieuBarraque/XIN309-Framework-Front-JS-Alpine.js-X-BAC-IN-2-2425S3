import "./navbar.css";
import { onAuthStateChanged, signOut } from "../../services/firebase/auth";
import { auth } from "../../services/firebase/firebaseConfig";

export default function Navbar() {
  return `
    <nav class="navbar">
      <div class="navbar-logo">
        <a href="/" data-link>EF<span>GUESS</span></a>
      </div>
      <div class="navbar-routes">
        <a href="/" class="route-link" data-link>Home</a>
        <a href="/quiz" class="route-link" data-link>Quizz</a>
        <a href="/leaderboard" class="route-link" data-link>Leaderboard</a>
        <a href="/about" class="route-link" data-link>About</a>
      </div>
      <div class="navbar-buttons">
        <div class="navbar-links">
          <a href="/post" class="navbar-link" data-link>
            <i class="fas fa-plus-circle"></i> Créez
          </a>
          <a href="/trips" class="navbar-link" data-link>
            <i class="fas fa-heart"></i> Favories
          </a>
          <a href="/alerts" class="navbar-link" data-link>
            <i class="fas fa-bell"></i> Notifications
          </a>
        </div>
        <a id="auth-btn-signin" href="/signin" class="btn btn-signin" data-link>Connexion</a>
        <a id="auth-btn-register" href="/register" class="btn btn-register" data-link>Inscription</a>
      </div>
    </nav>
  `;
}

export function setupNavbarEvents() {
  document.addEventListener("DOMContentLoaded", () => {
    const authSignIn = document.getElementById("auth-btn-signin");
    const authRegister = document.getElementById("auth-btn-register");

    let logoutListenerAttached = false;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (authSignIn) {
          authSignIn.textContent = "Profil";
          authSignIn.setAttribute("href", "/profile");
        }
        if (authRegister) {
          authRegister.textContent = "Déconnexion";
          authRegister.setAttribute("href", "#");

          if (!logoutListenerAttached) {
            authRegister.addEventListener("click", async (e) => {
              e.preventDefault();
              try {
                await signOut(auth);
                alert("Déconnexion réussie.");
                window.location.href = "/";
              } catch (error) {
                console.error("Erreur lors de la déconnexion :", error.message);
                alert("Erreur lors de la déconnexion. Veuillez réessayer.");
              }
            });
            logoutListenerAttached = true;
          }
        }
      } else {
        if (authSignIn) {
          authSignIn.textContent = "Connexion";
          authSignIn.setAttribute("href", "/signin");
        }
        if (authRegister) {
          authRegister.textContent = "Inscription";
          authRegister.setAttribute("href", "/register");
        }
      }
    });
  });
}
