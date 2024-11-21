import Navbar from './components/Navbar/Navbar.js';
import { setupRouter } from './routes/router.js';

// Insérer la navbar dans le DOM
document.getElementById('app').innerHTML = Navbar();

// Configurer le système de routage
setupRouter();
