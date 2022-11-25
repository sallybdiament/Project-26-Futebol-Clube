import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  freezeTableName: true,
  timestamps: false,
});

Teams.hasMany(Matches, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});
Teams.hasMany(Matches, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

Matches.belongsTo(Teams, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});
Matches.belongsTo(Teams, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

export default Matches;
