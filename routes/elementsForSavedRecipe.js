const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth.js');
const elementsForSavedRecipeCtrl = require('../controllers/elementsForSavedRecipe');

router.post('/createelement', auth, elementsForSavedRecipeCtrl.createElement);
router.get('/', auth, elementsForSavedRecipeCtrl.getAllElementsForRecipe);
router.get('/oneelement', auth, elementsForSavedRecipeCtrl.getOneElement);
router.delete('/delete', auth, elementsForSavedRecipeCtrl.deleteElement);
router.put('/', auth, elementsForSavedRecipeCtrl.updateElement);

module.exports = router