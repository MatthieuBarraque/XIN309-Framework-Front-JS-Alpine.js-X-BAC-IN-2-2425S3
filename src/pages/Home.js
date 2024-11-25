import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';
import createCarousel from '../components/Home/Carousel/carousel.js';
import FeatureSection from '../components/Home/FeatureSection/FeatureSection.js';

export default function Home() {
  const featureSection = new FeatureSection();
  const html = `
    ${Navbar()}
    <div id="carousel"></div>
    <main>
      ${featureSection.render()}
    </main>
    ${Footer()}
  `;

  setTimeout(() => {
    createCarousel('carousel');
  }, 0);

  return html;
}
