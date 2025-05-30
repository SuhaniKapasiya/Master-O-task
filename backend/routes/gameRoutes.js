const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/roll', gameController.roll);
router.get('/points', gameController.getPoints);

module.exports = router;
