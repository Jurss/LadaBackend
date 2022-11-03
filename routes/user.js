const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/', userCtrl.signUp)
router.get('/', userCtrl.signIn)
router.put('/update', userCtrl.changePass)
router.delete('/deleteaccount', userCtrl.deleteAccount)

module.exports = router;