import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatch from '../entities/IMatch';
import ITeam from '../entities/ITeam';
import {
//     IAllProperties,
//   IProperties2,
  IProperties } from '../entities/IProperties';

const getEndedMatches = () => Matches.findAll({
  where: { inProgress: false },
});

const getTeams = () => Teams.findAll();

export const allMatches = (match: IMatch, team: ITeam, properties: IProperties) => {
  let {
    totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws,
  } = properties;
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

export const homeMatches = (match: IMatch, team: ITeam, properties: IProperties) => {
  let {
    totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws,
  } = properties;
  if (team.id === match.homeTeam) {
    totalGames += 1;
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
  }
  return { totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws };
};

export const awayMatches = (match: IMatch, team: ITeam, properties: IProperties) => {
  let {
    totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws,
  } = properties;
  if (team.id === match.awayTeam) {
    totalGames += 1;
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
    if (match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
  }
  return { totalGames, goalsFavor, goalsOwn, totalVictories, totalDraws };
};

export const leaderboard = async (locationTeams: any) => {
  const teams = await getTeams();
  const endedMatches = await getEndedMatches();
  return teams.map((team) => {
    let properties = {
      totalGames: 0, goalsFavor: 0, goalsOwn: 0, totalVictories: 0, totalDraws: 0,
    };
    endedMatches.forEach((match) => {
      properties = locationTeams(match, team, properties);
    });
    return { name: team.teamName, ...properties };
  });
};

export const completeLeaderboard = async (a: any) => {
  const array = await leaderboard(a);
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

export const leaderboardOrdered = async (array1: any) => {
  const array = await completeLeaderboard(array1) || 0;
  //   const sorted = array.sort((a, b) => {
  //     if (b.goalsFavor === a.goalsFavor) {
  //       return a.goalsOwn - b.goalsOwn;
  //     }
  //     if (b.goalsBalance === a.goalsBalance) {
  //       return b.goalsFavor - a.goalsFavor;
  //     }
  //     if (b.totalVictories === a.totalVictories) {
  //       return b.goalsBalance - a.goalsBalance;
  //     }
  //     if (b.totalPoints === a.totalPoints) {
  //       return b.totalVictories - a.totalVictories;
  //     }
  //     return b.totalPoints - a.totalPoints;
  //   })
  const sorted = array.sort((a, b) => (
    (b.totalPoints - a.totalPoints
         || b.totalVictories - a.totalVictories
         || b.goalsBalance - a.goalsBalance
         || b.goalsFavor - a.goalsFavor
         || a.goalsOwn - b.goalsOwn)));
  return sorted;
};
