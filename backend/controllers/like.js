//import des modèles
const models = require('../models/');
// import du module
const asyncLib = require('async');
//Ajout d'un like
// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
module.exports = {
    likeProduct: function (req, res) {
        // Params
    let userId    = req.params.userId;
    let productId = req.params.productId;

    if (productId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
        function(done) {
            models.Product.findOne({
                where: { id: productId }
            })
            .then(function(productFound) {
                done(null, productFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify product' });
            });
        },
        function(productFound, done) {
            if(productFound) {
                models.User.findOne({
                    where: { id: userId }
            })
            .then(function(userFound) {
                done(null, productFound, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            });
            } else {
                res.status(404).json({ 'error': 'product not found' });
            }
        },
        function(productFound, userFound, done) {
            if(userFound) {
                models.Like.findOne({
                    where: {
                        userId: userId ,
                        productId: productId 
                    }
                })
                .then(function(userAlreadyLikedFound) {
                    done(null, productFound, userFound, userAlreadyLikedFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify if user already liked' });
                });
                } else {
                    res.status(404).json({ 'error': 'user does not exist' });
                }
            },
        function (productFound, userFound, userAlreadyLikedFound, done) {
            if (!userAlreadyLikedFound) {
                models.Like.create({
                    userId: userFound.id,
                    productId: productFound.id,
                    isLike: LIKED
                })
                    .then(function (alreadyLikeFound) {
                        done(null, productFound, userFound, alreadyLikeFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to set user reaction' });
                    });
            } else if (userAlreadyLikedFound.isLike === DISLIKED) {
                userAlreadyLikedFound.update({
                    isLike: LIKED,
                }).then(function () {
                    done(null, productFound, userFound);
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'cannot update user reaction' });
                });
            } else {
                res.status(409).json({ 'error': 'product already liked' });
            }
        },
        function(productFound, userFound, done) {
            productFound.update({
                likes: productFound.likes + 1,
            }).then(function() {
                done(productFound);
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update product like counter' });
            });
        },
    ], function(productFound) {
        if (productFound) {
        return res.status(201).json(productFound);
        } else {
        return res.status(500).json({ 'error': 'cannot update product' });
        }
    });
},
    dislikeProduct: function(req, res) {
        // Params
    let userId    = req.params.userId
    let productId = req.params.productId;

    if (productId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
    function(done) {
        models.Product.findOne({
            where: { id: productId }
        })
        .then(function(productFound) {
            done(null, productFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify product' });
        });
    },
        function(productFound, done) {
        if(productFound) {
            models.User.findOne({
            where: { id: userId }
        })
        .then(function(userFound) {
            done(null, productFound, userFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
        } else {
            res.status(404).json({ 'error': 'product not found' });
        }
    },
        function(productFound, userFound, done) {
        if(userFound) {
            models.Like.findOne({
                where: {
                    userId: userId ,
                    productId: productId 
                }
            })
            .then(function(userAlreadyLikedFound) {
                done(null, productFound, userFound, userAlreadyLikedFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify if user already liked' });
            });
            } else {
                res.status(404).json({ 'error': 'user does not exist' });
            }
        },
        function(productFound, userFound, userAlreadyLikedFound, done) {
        if(!userAlreadyLikedFound) {
        productFound.addUser(userFound, { isLike: DISLIKED })
        .then(function (alreadyLikeFound) {
            done(null, productFound, userFound, alreadyLikeFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
        } else {
            if (userAlreadyLikedFound.isLike === LIKED) {
                userAlreadyLikedFound.update({
                isLike: DISLIKED,
            }).then(function() {
                done(null, productFound, userFound);
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update user reaction' });
            });
            } else {
                res.status(409).json({ 'error': 'product already disliked' });
            }
        }
    },
        function(productFound, userFound, done) {
            productFound.update({
                likes: productFound.likes - 1,
            }).then(function() {
                done(productFound);
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update product like counter' });
            });
        },
    ], function(productFound) {
            if (productFound) {
            return res.status(201).json(productFound);
            } else {
            return res.status(500).json({ 'error': 'cannot update product' });
        }
        });
    }
}