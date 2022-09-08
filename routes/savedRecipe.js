const express = require('express');
const router = express.Router();
const multer = require('../midlewares/multer-config')
const auth = require('../midlewares/auth.js')
const savedRecipeCtrl = require('../controllers/savedRecipe')

router.post('/', auth, multer, savedRecipeCtrl.createRecipe);
router.get('/', auth, savedRecipeCtrl.getAllRecipe);
router.get('/:userId/:id', auth, savedRecipeCtrl.getOneRecipe);
router.delete('/:id', auth, savedRecipeCtrl.deleteRecipe);
router.put('/', auth, multer, savedRecipeCtrl.updateRecipe);

module.exports = router