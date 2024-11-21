import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';

export default function Quiz() {
  return `
    ${Navbar()}
    <main>
      <h1>Welcome to the Quiz Page</h1>
      <p>This is the main content of the Quiz page.</p>
    </main>
    ${Footer()}
  `;
}
