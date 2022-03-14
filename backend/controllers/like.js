const Models = require("../models");

//Ajout d'un like
exports.switch = (request, response) => {
    Models.Like.findOne({
        where: {
            ProductId: request.body.productId,
            UserId: response.locals.userId,
        },
    })
        .then((like) => {
            if (like) {
                Models.Like.update(
                {
                    likeState: !like.likeState,
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
                    id: request.body.id,
                },
                }).then((post) => {
                if (post) {
                    Models.Like.create({
                        UserId: response.locals.userId,
                        ProductId: product.id,
                        likeState: true,
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
                        message: "Post introuvable !",
                    });
                }
                });
            }
        })
        .catch((error) => {
            response.status(500).json(error);
        });
    };