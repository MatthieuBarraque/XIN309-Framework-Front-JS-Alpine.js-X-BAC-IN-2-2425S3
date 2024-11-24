import "./navbar.css";

export default function Navbar() {
  return `
    <nav class="navbar">
      <!-- Logo -->
      <div class="navbar-logo">
        <a href="/" data-link>EF<span>GUESS</span></a>
      </div>

      <!-- Liens au centre -->
      <div class="navbar-routes">
        <a href="/" class="route-link" data-link>Home</a>
        <a href="/quiz" class="route-link" data-link>Quizz</a>
        <a href="/leaderboard" class="route-link" data-link>Leaderboard</a>
        <a href="/about" class="route-link" data-link>About</a>
      </div>

      <!-- Icônes et boutons à droite -->
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
        <a href="/signin" class="btn btn-signin" data-link>Connexion</a>
        <a href="/register" class="btn btn-register" data-link>Inscription</a>
      </div>
    </nav>
  `;
}
