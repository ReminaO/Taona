const Models = require("../models");

//import des modèles
const models = require('../models/');
// import du module
const asyncLib = require('async');
//Ajout d'un like
exports.switchLike = (req, res, next) => {
    // Paramètres

    const userId = req.params.userId;

    asyncLib.waterfall([
        // 1. recherche l'utilsateur
        function(done) {
            models.User.findOne({
                where: { id: userId },
                attributes : ["id"]
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible d\'atteindre l\'utilisateur' });
            });
        },
        
        // 2. si trouvé créé le commentaire
        function (userFound, done) {
            if (userFound) {
                // Créé le like et l'enregistre dans la BDD
                models.Like.create({
                    UserId: userFound.id,
                    ProductId: req.params.productId,
                    likeState: !req.body.likeState
                    })
                    .then(function(newComment) {
                        done(newComment);
                    })
                    .catch(() => res.status(400).json({ message: "erreur controller like" }));
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },

        // 3. Confirmation une fois le commenatire créé
    ], function(newComment) {
        if (newComment) {
            return res.status(201).json(newComment);
        } else {
            return res.status(500).json({ 'error': 'le like ne peut être modifié' });
        }
    })
};
