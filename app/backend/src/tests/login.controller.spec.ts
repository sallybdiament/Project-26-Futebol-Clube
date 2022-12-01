import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import login from '../controllers/Auth.controller';
import { validateBody, validateLogin } from '../services/AuthService';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockLogin = { 
    "email": "admin@admin.com",
    "password": "secret_admin"
  };

const mockToken = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjY5ODM2NTIyLCJleHAiOjE2Njk5MjI5MjJ9.Jm-N2UvF79U1d7UHuJ9_lmRDmx1rhMDoJD4Ot9FXLBI"
  }

describe('Teste de integração do login do AuthController', () => {
  it('Testando rota post /login', async function() {
    const response = await chai.request(app).post('/login').send(
        { 
            "email": "admin@admin.com",
            "password": "secret_admin"
          } ,
      );
  
      expect(response.status).to.be.equal(200);
    });
    it('Testando rota post /login/validate', async function() {
      const response = await chai.request(app).get('/login/validate');
        expect(response.status).to.be.equal(200);
      });
    it('Não deve ser possível retornar um token com email ou senha em branco', 
        async () => {
          const response = await chai.request(app).post('/login').send( { 
            "email": "admin@admin.com",
            "password": ""
          } ,);
          expect(response.status).to.be.equal(400);
          expect(response.body).to.be.deep.equal({
            message: 'All fields must be filled',
          });
        },
      );
});

describe('Teste de integração do teams', () => {
  it('Testando rota get /teams', async function() {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    });
});

describe('Teste de integração do matches', () => {
  it('Testando rota get /matches', async function() {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    });
    it('Testando rota post /matches', async function() {
      const response = await chai.request(app).post('/matches').send(
        {
          "homeTeam": 16,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
        } ,
        );
    expect(response.status).to.be.equal(201);
});
});

describe('Teste de integração do leaderboard', () => {
  it('Testando rota get /leaderboard', async function() {
    const response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    });
});
// routers.get('/login/validate', validateRole);
// routers.get('/teams', findAllTeams);
// routers.get('/teams/:id', findOneTeam);
// routers.get('/matches', findAllMatches);
// routers.post('/matches', createMatch);
// routers.patch('/matches/:id', updateGoals);
// routers.patch('/matches/:id/finish', endMatch);
// routers.get('/leaderboard', getLeaderboard);
// routers.get('/leaderboard/home', getLeaderboardHome);
// routers.get('/leaderboard/away', getLeaderboardAway);