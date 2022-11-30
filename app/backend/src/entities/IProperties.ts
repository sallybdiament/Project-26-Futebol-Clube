export interface IProperties{
  totalGames: number,
  goalsFavor: number ;
  goalsOwn: number ;
  totalVictories: number ;
  totalDraws: number ;
}

export interface IProperties2 {
  totalGames: number,
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
}

export interface IAllProperties extends IProperties2 {
  name: string;
  totalGames: number,
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
}
