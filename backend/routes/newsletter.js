//import des modules
const express = require('express');
const router = express.Router();
//import du controller
const newsCtrl = require('../controllers/newsletter');
//Routes pour appeler les controllers user
router.post('/lists/14fd06490a/members', newsCtrl.createNews);

module.exports = router; // Export du fichier