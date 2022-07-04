//import des modules
const express = require('express');
const router = express.Router();
//import du controller
const newsCtrl = require('../controllers/newsletter');
//Routes pour appeler les controllers user
router.post(`/lists/${process.env.LIST_ID}/members`, newsCtrl.createNews);

module.exports = router; // Export du fichier