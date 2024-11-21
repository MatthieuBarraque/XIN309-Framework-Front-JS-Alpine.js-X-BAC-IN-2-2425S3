import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';

export default function Leaderboard() {
  return `
    ${Navbar()}
    <main>
      <h1>Welcome to the Leaderboard Page</h1>
      <p>This is the main content of the Leaderboard.</p>
    </main>
    ${Footer()}
  `;
}
