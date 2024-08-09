// routes/triviaroutes.js
const express = require('express');
const { getQuestions } = require('../controllers/triviacontroller');

const router = express.Router();

router.get('/questions', getQuestions);

module.exports = router;