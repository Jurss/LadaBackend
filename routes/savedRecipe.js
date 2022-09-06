const express = require('express');
const router = express.Router();
const multer = require('../midlewares/multer-config')
const savedRecipeCtrl = require('../controllers/savedRecipe')

router.post('/', multer, savedRecipeCtrl.createRecipe);
router.get('/', savedRecipeCtrl.getAllRecipe);
router.get('/:userId/:id', savedRecipeCtrl.getOneRecipe);
router.delete('/:id', savedRecipeCtrl.deleteRecipe);
router.put('/', multer, savedRecipeCtrl.updateRecipe);

module.exports = router