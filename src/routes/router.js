import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Quiz from '../pages/Quiz.js';
import Leaderboard from '../pages/Leaderboard.js';
import NotFound from '../components/Utils/NotFound.js';
import Signin from '../pages/PageAuth/Signin.js';
import Register from '../pages/PageAuth/Register.js';

export function setupRouter() {
  // Define routes
  const routes = {
    '/': Home,
    '/about': About,
    '/quiz': Quiz,
    '/leaderboard': Leaderboard,
    '/post': () => '<h1>Post Page</h1>',
    '/alerts': () => '<h1>Alerts Page</h1>',
    '/trips': () => '<h1>Trips Page</h1>',
    '/signin': Signin,
    '/register': Register,
  };

  const root = document.getElementById('app');

  function render(path) {
    const page = routes[path] || NotFound;
    root.innerHTML = typeof page === 'function' ? page() : page;
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
