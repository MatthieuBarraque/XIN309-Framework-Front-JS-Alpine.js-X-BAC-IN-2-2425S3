import Navbar, { setupNavbarEvents } from './components/Navbar/Navbar.js';
import { setupRouter } from './routes/router.js';

// Insérer la navbar dans le DOM
document.getElementById('app').innerHTML = Navbar();

// Initialiser les événements associés
setupNavbarEvents();

// Configurer le système de routage
setupRouter();