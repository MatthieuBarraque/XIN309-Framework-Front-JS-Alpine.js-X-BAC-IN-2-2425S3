import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Quiz from '../pages/Quiz.js';
import LeaderboardPage, {
  setupLeaderboardPage,
} from '../pages/Leaderboard.js';
import NotFound from '../components/Utils/NotFound.js';
import Signin, {
  setupSigninFormEvents,
} from '../pages/PageAuth/Signin.js';
import Register, {
  setupRegisterEvents,
} from '../pages/PageAuth/Register.js';
import Profile, {
  setupProfileEvents,
} from '../pages/Profile/Profile.js';
import { onAuthStateChanged } from '../services/firebase/auth';
import { auth } from '../services/firebase/firebaseConfig';
import { setupNavbarEvents } from '../components/Navbar/Navbar.js';
import Alpine from 'alpinejs';

export function setupRouter() {
  const routes = {
    '/': Home,
    '/about': About,
    '/quiz': Quiz,
    '/leaderboard': LeaderboardPage,
    '/signin': Signin,
    '/register': Register,
    '/profile': Profile,
  };

  const root = document.getElementById('app');

  async function render(path) {
    const page = routes[path] || NotFound;

    const user = await new Promise((resolve) =>
      onAuthStateChanged(auth, (user) => resolve(user))
    );

    if (user && (path === '/signin' || path === '/register')) {
      window.history.pushState(null, '', '/profile');
      path = '/profile';
    }

    root.innerHTML = typeof page === 'function' ? page() : page;

    Alpine.initTree(root);

    setupNavbarEvents();

    if (path === '/register') {
      setupRegisterEvents();
    }
    if (path === '/profile') {
      setupProfileEvents();
    }
    if (path === '/signin') {
      setupSigninFormEvents();
    }
    if (path === '/leaderboard') {
      setupLeaderboardPage();
    }
  }

  window.addEventListener('popstate', () => render(window.location.pathname));

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      const path = link.getAttribute('href');
      window.history.pushState(null, '', path);
      render(path);
    }
  });

  render(window.location.pathname);
}