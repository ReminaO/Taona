//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

//import du controller
const orderCtrl = require('../controllers/orders');

//Routes pour appeler les controllers cart
router.post('/:id', auth, orderCtrl.createOrder);
router.delete('/:id', auth, orderCtrl.deleteOrder);
router.get('/', auth, orderCtrl.getAllOrders);
router.get('/:id', auth, orderCtrl.getOrder);



module.exports = router;//Export du fichier