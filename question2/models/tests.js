const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');
const { readOneUserFromUsername } = require('./users');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');

const json = path.join(__dirname, '/../data/games.json');

const createGameResultTab = [
  {
    username: 'One',
    score: 2,
    date: getDate(),
  },
];

function readAllQuestions() {
  const questions = parse(jsonDbPath);
  // eslint-disable-next-line no-console
  console.log(questions, 'iICIII');
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  // Sélectionner les 3 premières questions
  const randomQuestions = shuffledQuestions.slice(0, 3);

  return randomQuestions;
}

function readAllQuestionByLevel(level) {
  const questions = parse(jsonDbPath);

  const questionFound = questions.filter((question) => question.level === level);
  if (questionFound < 0) return undefined;

  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  // Sélectionner les 3 premières questions
  const randomQuestions = shuffledQuestions.slice(0, 3);

  return randomQuestions;
}

function createGameResultForUsername(username, score) {
  const gameResults = parse(json, createGameResultTab);

  const user = readOneUserFromUsername(username);

  const createdGameResult = {
    user,
    score: parseInt(escape(score), 10),
    date: getDate(),
  };

  // eslint-disable-next-line no-console
  console.log('HHH', createdGameResult);

  gameResults.push(createdGameResult);

  serialize(json, gameResults);

  return createdGameResult;
}

function getDate() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function readAllResult() {
  const results = parse(json, createGameResultTab);
  return results;
}

module.exports = {
  readAllQuestions,
  readAllQuestionByLevel,
  createGameResultForUsername,
  readAllResult,
};
