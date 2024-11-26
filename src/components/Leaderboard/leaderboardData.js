import teamALogo from '../../assets/image/team-a-logo.png';
import teamBLogo from '../../assets/image/team-b-logo.png';
import teamCLogo from '../../assets/image/team-c-logo.png';
import teamDLogo from '../../assets/image/team-d-logo.png';
import teamELogo from '../../assets/image/team-e-logo.png';

export default function leaderboardData() {
  return {
    data: [
      {
        team: 'Natus Vincere',
        player: 'Natus Vincere',
        today: 3,
        total: 34,
        teamLogo: teamALogo,
      },
      {
        team: 'Vitality',
        player: 'Vitality',
        today: 3,
        total: 31,
        teamLogo: teamBLogo,
      },
      {
        team: 'Team Spirit',
        player: 'Team Spirit',
        today: 2,
        total: 26,
        teamLogo: teamCLogo,
      },
      {
        team: 'G2 Esports',
        player: 'G2 Esports',
        today: 2,
        total: 24,
        teamLogo: teamDLogo,
      },
      {
        team: 'FaZe Clan',
        player: 'FaZe Clan',
        today: 2,
        total: 21,
        teamLogo: teamELogo,
      },
    ],
  };
}
