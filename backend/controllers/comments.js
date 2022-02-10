//import des modèles
const models = require('../models/');
// import du module
const asyncLib = require('async');

// Controllers pour créer un commenataire
exports.createComment = (req, res, next) => {
    // Paramètres
    const content = req.body.content;
    const productId = req.params.id;

    if (comment == null) {
        return res.status(400).json({ 'error': 'Champs manquant' });
    }

    asyncLib.waterfall([
        // 1. recherche l'utilisateur
        function(done) {
            models.Product.findOne({
                where: { id: productId },
                attributes : ["id"]
            })
            .then(function(productFound) {
                done(null, productFound);
            })
            .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible d\'atteindre l\'utilisateur' });
            });
        },
        
        // 2. si trouvé créé le commentaire
        function (productFound, done) {
            if (productFound) {
                // Créé le commentaire et l'enregistre dans la BDD
                models.Comment.create({
                    content: content,
                    userName: response.locals.firstName,
                    UserId: response.locals.userId,
                    ProductId: productFound.id,
                    })
                    .then(function(newComment) {
                        done(newComment);
                    })
                    .catch(() => res.status(400).json({ message: "erreur controller commentaire" }));
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },

        // 3. Confirmation une fois le commenatire créé
    ], function(newComment) {
        if (newComment) {
            return res.status(201).json(newComment);
        } else {
            return res.status(500).json({ 'error': 'le commentaire ne peut être envoyé' });
        }
    })
};

// Controllers pour effacer un commentaire grâce a l'ID
exports.deleteComment = (req, res, next) => {
    const userId = req.params.id;

    asyncLib.waterfall([

    // Vérifie que l'utilisateur soit existant
    function(done) {
        models.User.findOne({
            attributes : ["id"],
            where: { id: req.body.id }
        }).then(function(userFound) {
            done(null, userFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'Utilisateur inexistant' });
        });
    },

    // appel du commentaire concerné
    function(userFound, done) {
        models.Comment.findOne({
            where: { id: req.params.id }
        })
        .then(function(commentFound) {
            done(null, userFound, commentFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'commentaire non trouvé' });
        });
    },

    function(userFound, commentFound, done) {

        // Vérification que l'utilisateur soit l'auteur du commentaire
        if (userFound.id == commentFound.userId || userFound.isAdmin == true) { // or if he's admin

            // Suppression du commentaire
            models.Comment.destroy({
                    where: { id: req.body.id }
                })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));

        } else {
            res.status(401).json({ 'error': 'utilisateur non autorisé' });
        }
    },
],

    function(userFound) {
        if (userFound) {
            return res.status(201).json({ 'message': 'commentaire effacé' });
        } else {
            return res.status(500).json({ 'error': 'le commentaire ne peut être effacé' });
        }
    });
};

  // Controllers pour afficher toutes les commentaires
exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
        include: [
            { // Relie le message avec les tables User et Comments
                model: models.User
            },
            {
                model: models.Product
            },
        ]
    })
        .then((comment => res.status(200).json(comment)))
        .catch(() => res.status(400).json({ error: "Erreur lors de l'affichage des commentaires" }));
};

exports.switch = (request, response) => {
    Models.Comment.findOne({
        where: {
            ProductId: request.body.productId,
            UserId: response.locals.userId,
        },
    })
    .then((like) => {
        if (like) {
            Models.Comment.update(
            {
                one: !like.one,
                two: !like.two,
                three: !like.three,
                four: !like.four,
                five: !like.five,
            },
            {
                where: {
                    id: like.id,
                },
            }
            )
            .then(() => {
                response.status(200).json({
                    message: "Like modifié !",
                });
            })
            .catch((error) => {
                response.status(500).json(error);
            });
        } else {
            Models.Product.findOne({
            where: {
                id: request.body.productId,
            },
            }).then((post) => {
            if (post) {
                Models.Comment.create({
                    UserId: response.locals.userId,
                    PostId: product.id,
                    one: true,
                    two: true,
                    three: true,
                    four: true,
                    five: true,
                })
                    .then(() => {
                        response.status(200).json({
                        message: "Like ajouté !",
                        });
                    })
                    .catch((error) => {
                        response.status(500).json(error);
                    });
            } else {
                response.status(404).json({
                    message: "Produit introuvable !",
                });
            }
            });
        }
    })
    .catch((error) => {
        response.status(500).json(error);
    });
};
