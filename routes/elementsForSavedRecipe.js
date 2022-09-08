const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth.js');
const elementsForSavedRecipeCtrl = require('../controllers/elementsForSavedRecipe');

router.post('/', auth, elementsForSavedRecipeCtrl.createElement);
router.get('/', auth, elementsForSavedRecipeCtrl.getAllElementsForRecipe);
router.delete('/:id', auth, elementsForSavedRecipeCtrl.deleteElement);
router.put('/', auth, elementsForSavedRecipeCtrl.updateElement);

module.exports = router