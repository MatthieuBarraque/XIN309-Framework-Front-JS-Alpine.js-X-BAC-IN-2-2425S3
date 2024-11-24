import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Quiz from '../pages/Quiz.js';
import Leaderboard from '../pages/Leaderboard.js';
import NotFound from '../components/Utils/NotFound.js';
import Signin from '../pages/PageAuth/Signin.js';
import Register from '../pages/PageAuth/Register.js';
import Profile from '../pages/Profile/Profile.js';

export function setupRouter() {
  const routes = {
    '/': Home,
    '/about': About,
    '/quiz': Quiz,
    '/leaderboard': Leaderboard,
    '/signin': Signin,
    '/register': Register,
    '/profile': Profile,
  };

  const root = document.getElementById('app');

  /**
   * Renders the page based on the path.
   * Ensures that events and scripts tied to the page are initialized after rendering.
   * @param {string} path - The path to render.
   */
  function render(path) {
    const page = routes[path] || NotFound;

    // Log an error if the route is not defined
    if (!page) {
      console.error(`Route "${path}" is not defined.`);
      root.innerHTML = '<h1>Page Not Found</h1>';
      return;
    }

    try {
      root.innerHTML = typeof page === 'function' ? page() : page;

      // Initialize page-specific logic after rendering
      if (path === '/signin' && typeof Signin === 'function') {
        const signinEvents = import('../pages/PageAuth/Signin.js');
        signinEvents.then(({ setupSigninFormEvents }) => setupSigninFormEvents && setupSigninFormEvents());
      }

      if (path === '/register' && typeof Register === 'function') {
        const registerEvents = import('../pages/PageAuth/Register.js');
        registerEvents.then(({ setupRegisterFormEvents }) => setupRegisterFormEvents && setupRegisterFormEvents());
      }

      if (path === '/profile' && typeof Profile === 'function') {
        const profileEvents = import('../pages/Profile/Profile.js');
        profileEvents.then(({ setupProfilePageEvents }) => setupProfilePageEvents && setupProfilePageEvents());
      }
    } catch (error) {
      console.error(`Error rendering route "${path}":`, error);
      root.innerHTML = '<h1>Une erreur est survenue lors du chargement.</h1>';
    }
  }

  // Listen for browser navigation (back/forward)
  window.addEventListener('popstate', () => render(window.location.pathname));

  // Intercept navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      const path = link.getAttribute('href');
      window.history.pushState(null, '', path);
      render(path);
    }
  });

  // Initial render based on current path
  render(window.location.pathname);
}
