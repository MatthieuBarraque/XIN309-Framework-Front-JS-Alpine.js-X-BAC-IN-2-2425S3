import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';
import createCarousel from '../components/Home/Carousel/carousel.js';

export default function Home() {
  const html = `
    ${Navbar()}
    <div id="carousel"></div>
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the homepage.</p>
    </main>
    ${Footer()}
  `;

  // Une fois que le DOM est chargé, on initialise le carousel
  setTimeout(() => {
    createCarousel('carousel');
  }, 0);

  return html;
}
