const express = require('express');
const router = express.Router();
const savedRecipeCtrl = require('../controllers/savedRecipe')

router.post('/', savedRecipeCtrl.createRecipe);
router.get('/:userId', savedRecipeCtrl.getRecipe);

module.exports = router