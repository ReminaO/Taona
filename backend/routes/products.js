//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

//import du controller
const productsCtrl = require('../controllers/products');

// Middleware pour l'enregistrement des images
const multer = require('../middleware/product');

//Routes pour appeler les controllers produits
router.post('/:id', auth, multer, productsCtrl.createProducts);
router.put('/:userId/:id', auth, multer, productsCtrl.modifyProduct);
router.delete('/:userId/:id', auth, productsCtrl.deleteProduct);
router.get('/', auth, productsCtrl.getAllProducts);
router.get('/:id', auth, productsCtrl.getProduct);



module.exports = router;//Export du fichier