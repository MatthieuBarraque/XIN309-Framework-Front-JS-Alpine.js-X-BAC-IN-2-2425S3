import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';
import Leaderboard from '../components/Leaderboard/Leaderboard.js';
import leaderboardData from '../components/Leaderboard/leaderboardData.js';

export default function LeaderboardPage() {
  return `
    ${Navbar()}
    <div class="leaderboard-page">
      ${Leaderboard()}
    </div>
    ${Footer()}
  `;
}

export function setupLeaderboardPage() {
  window.leaderboardData = leaderboardData;
}
