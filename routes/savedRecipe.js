const express = require('express');
const router = express.Router();
const savedRecipeCtrl = require('../controllers/savedRecipe')

router.post('/', savedRecipeCtrl.createRecipe);
router.get('/', savedRecipeCtrl.getAllRecipe);
router.get('/:userId/:id', savedRecipeCtrl.getOneRecipe);
router.delete('/:id', savedRecipeCtrl.deleteRecipe);
router.put('/', savedRecipeCtrl.updateRecipe);





module.exports = router