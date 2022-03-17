const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const likeController = require("../controllers/like");
//Import des middlewares
const auth = require('../middleware/auth');

//Ajout / suppression d'un like
router.post("/:userId/:productId/like", auth, likeController.likeProduct);
router.post("/:userId/:productId/dislike", auth, likeController.dislikeProduct);

module.exports = router;