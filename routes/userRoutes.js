const express = require('express');
const { registerUser, loginUser, checkAttempts, recordAttempt } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/checkAttempts/:email', checkAttempts);
router.post('/recordAttempt', recordAttempt);

module.exports = router;