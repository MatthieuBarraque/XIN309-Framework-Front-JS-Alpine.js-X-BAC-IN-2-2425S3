import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';

export default function Home() {
  return `
    ${Navbar()}
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the homepage.</p>
    </main>
    ${Footer()}
  `;
}
