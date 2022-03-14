//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

//import du controller
const commentsCtrl = require('../controllers/comments');

//Routes pour appeler les controllers comment
router.post('/:id', auth, commentsCtrl.createComment);
router.post('/switch', auth, commentsCtrl.switch);
router.delete('/:id/', auth, commentsCtrl.deleteComment);
router.get('/', commentsCtrl.getAllComments);


module.exports = router;//Export du fichier