const express = require('express');
const router = express.Router();
const elementsForSavedRecipeCtrl = require('../controllers/elementsForSavedRecipe')

router.post('/', elementsForSavedRecipeCtrl.createElement);
router.get('/', elementsForSavedRecipeCtrl.getAllElementsForRecipe);
router.delete('/:id', elementsForSavedRecipeCtrl.deleteElement);
router.put('/', elementsForSavedRecipeCtrl.updateElement);

module.exports = router