import Alpine from 'alpinejs';
import { setupRouter } from './routes/router.js';

window.Alpine = Alpine;

Alpine.start();

setupRouter();
