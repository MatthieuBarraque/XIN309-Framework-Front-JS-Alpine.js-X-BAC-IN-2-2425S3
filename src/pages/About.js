import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';

export default function About() {
  return `
    ${Navbar()}
    <main>
      <h1>About Us</h1>
      <p>Learn more about our application and team.</p>
    </main>
    ${Footer()}
  `;
}
