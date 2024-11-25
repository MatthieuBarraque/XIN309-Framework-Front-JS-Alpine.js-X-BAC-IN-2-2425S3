import './leaderboard.css';

export default function Leaderboard() {
  return `
    <div class="leaderboard" x-data="leaderboardData">
      <div class="leaderboard__header">
        <h1 class="leaderboard__title">Leaderboard EFGUESS</h1>
        <h2 class="leaderboard__subtitle">Goal Score</h2>
      </div>
      <div class="leaderboard__table">
        <div class="leaderboard__row leaderboard__row--header">
          <span class="leaderboard__column leaderboard__column--team">Team</span>
          <span class="leaderboard__column leaderboard__column--player">Player</span>
          <span class="leaderboard__column leaderboard__column--today">Today</span>
          <span class="leaderboard__column leaderboard__column--total">Total</span>
        </div>
        <template x-for="(row, index) in data" :key="index">
          <div class="leaderboard__row">
            <span class="leaderboard__column leaderboard__column--team">
              <img :src="row.teamLogo" alt="Team Logo" class="leaderboard__team-logo">
            </span>
            <span class="leaderboard__column leaderboard__column--player" x-text="row.player"></span>
            <span class="leaderboard__column leaderboard__column--today" x-text="row.today"></span>
            <span class="leaderboard__column leaderboard__column--total" x-text="row.total"></span>
          </div>
        </template>
      </div>
    </div>
  `;
}
