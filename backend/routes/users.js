//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

//import du controller user
const userCtrl = require('../controllers/users');

// Middleware pour l'enregistrement des images
const multer = require('../middleware/avatar');

//Routes pour appeler les controllers user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneProfile);
router.put('/:id/profile', auth, multer, userCtrl.modifyProfile);
router.put('/:id/password', auth, userCtrl.modifyPassword);
router.put('/:id/address', auth, userCtrl.modifyAddress);
router.put('/:id/number', auth, userCtrl.modifyNumber);
router.delete('/:id', auth, userCtrl.deleteProfile);

module.exports = router; // Export du fichier