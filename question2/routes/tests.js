const express = require('express');

const jwt = require('jsonwebtoken'); // Assurez-vous d'avoir installé le package jwt

const {
  readAllQuestions,
  readAllQuestionByLevel,
  createGameResultForUsername,
  readAllResult,
} = require('../models/tests');

const router = express.Router();

/* GET users listing. */
router.get('/start', (req, res) => {
  const { level } = req.query;

  if (!level) {
    const allQuestionsByLevel = readAllQuestions();
    res.json(allQuestionsByLevel);
  }
  const foundQuestions = readAllQuestionByLevel(level);

  if (!foundQuestions || foundQuestions.length === 0) {
    return res.sendStatus(404);
  }

  return res.json(foundQuestions);
});

/* GET users listing. */
router.get('/result', (req, res) => {
  const results = readAllResult();
  res.json(results);
});

// Create a result to a game
router.post('/', (req, res) => {
  const token = req.headers.authorization;

  const decodedToken = jwt.verify(token, 'ilovemypizza!'); // Remplacez 'votre-secret' par la clé secrète réelle

  const { username } = decodedToken.username;

  const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;

  if (!score) return res.sendStatus(400); // error code '400 Bad request'

  if (score < 0 || score > 3) return res.sendStatus(400);
  const createdResultGame = createGameResultForUsername(username, score);

  return res.json(createdResultGame);
});
module.exports = router;
