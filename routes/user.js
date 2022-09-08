const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/', userCtrl.signUp)
router.get('/', userCtrl.signIn)

module.exports = router;