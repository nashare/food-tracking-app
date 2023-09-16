const express = require('express');
const router = express.Router();
const mealsCtrl = require('../../controllers/api/meals');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.put('/edit/:mealId', ensureLoggedIn, mealsCtrl.update);
router.delete('/:mealId', ensureLoggedIn, mealsCtrl.delete);
router.get('/:userId', ensureLoggedIn, mealsCtrl.get);
router.post('/new', ensureLoggedIn, mealsCtrl.create);

module.exports = router;