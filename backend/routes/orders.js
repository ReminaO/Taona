//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

// Middleware pour l'enregistrement des images
const multer = require('../middleware/multer-config');

//import du controller
const orderCtrl = require('../controllers/orders');

//Routes pour appeler les controllers cart
router.post('/:id', auth, multer, orderCtrl.createOrder);
router.delete('/:id', auth, orderCtrl.deleteOrder);
router.get('/', auth, orderCtrl.getAllOrders);



module.exports = router;//Export du fichier