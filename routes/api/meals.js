const express = require('express');
const router = express.Router();
const mealsCtrl = require('../../controllers/api/meals');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:userId', ensureLoggedIn, mealsCtrl.get);
router.post('/new', ensureLoggedIn, mealsCtrl.create);

module.exports = router;