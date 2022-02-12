//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

// Middleware pour l'enregistrement des images
const multer = require('../middleware/productImg');

//import du controller
const productsCtrl = require('../controllers/products');

//Routes pour appeler les controllers produits
router.post('/:id', auth, multer, productsCtrl.createProducts);
router.put('/:id', auth, multer, productsCtrl.modifyProduct);
router.delete('/:id', auth, productsCtrl.deleteProduct);
router.get('/', auth, productsCtrl.getAllProducts);



module.exports = router;//Export du fichier