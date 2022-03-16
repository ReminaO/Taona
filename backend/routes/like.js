const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const likeController = require("../controllers/like");
//Import des middlewares
const auth = require('../middleware/auth');

//Ajout / suppression d'un like
router.post("/switch/:userId/:productId", auth, likeController.switchLike);

module.exports = router;