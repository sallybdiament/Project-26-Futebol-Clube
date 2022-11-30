import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatch from '../entities/IMatch';
import ITeam from '../entities/ITeam';
import IProperties from '../entities/IProperties';

const getEndedMatches = () => Matches.findAll({
  where: { inProgress: false },
});

const getTeams = () => Teams.findAll();

const novafuncao = (match: IMatch, team: ITeam, properties: IProperties) => {
  let {
    totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws,
  } = properties;
  console.log(team.id, match.homeTeam);
  if (team.id === match.homeTeam) {
    totalGames += 1;
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
  }
  if (team.id === match.awayTeam) {
    totalGames += 1;
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
    if (match.homeTeamGoals < match.awayTeamGoals) totalVictories += 1;
  }
  return { totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws };
};

export const leaderboard = async () => {
  const teams = await getTeams();
  const endedMatches = await getEndedMatches();
  return teams.map((team) => {
    let properties = {
      totalGames: 0, goalsFavor: 0, goalsOwn: 0, totalVictories: 0, totalDraws: 0,
    };
    endedMatches.forEach((match) => {
      properties = novafuncao(match, team, properties);
    });
    return { name: team.teamName, ...properties };
  });
};

export const completeLeaderboard = async () => {
  const array = await leaderboard();
  let totalPoints = 0;
  let totalLosses = 0;
  let goalsBalance = 0;
  let efficiency = 0;
  return array.map((t) => {
    totalPoints = (t.totalVictories * 3 + t.totalDraws);
    totalLosses = t.totalGames - t.totalVictories - t.totalDraws;
    goalsBalance = t.goalsFavor - t.goalsOwn;
    efficiency = (totalPoints / (t.totalGames * 3)) * 100;
    return {
      totalPoints,
      totalLosses,
      goalsBalance,
      efficiency: efficiency.toFixed(2),
      ...t };
  });
};

export const leaderboardOrdered = async () => {
  const array = await completeLeaderboard();
  const sorted1 = array.sort((a, b) => b.totalVictories - a.totalVictories);
  const sorted2 = sorted1.sort((a, b) => b.goalsBalance - a.goalsBalance);
  const sorted3 = sorted2.sort((a, b) => b.goalsFavor - a.goalsFavor);
  return sorted3.sort((a, b) => a.goalsOwn - b.goalsOwn);
};
