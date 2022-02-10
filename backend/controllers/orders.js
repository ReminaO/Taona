//Import des modules
const asyncLib = require('async');
//import des modèles
const models = require('../models');

//Paramètres
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 2;
const ITEMS_LIMIT = 50;

// Controllers pour créer un message
exports.createOrder = (req, res, next) => {
  

  // Paramètres
  const userId =  req.params.id;
  const quantity  = req.body.quantity;
  const productId = response.locals.userId;
  const amount = req.body.amount;
  const product = req.body.product
  

  asyncLib.waterfall([

    // 1. recherche de l'utilisateur
    function (done) {
      models.User.findOne({
        where: { id: userId }
      })
        .then(function (userFound) {
          done(null, userFound);
        })
        .catch(function (err) {
          return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur' });
        });
    },
      
    // 2. Une fois trouvé crée le ordere avec l'input
    function (userFound, done) {
      if (userFound) {
        models.Order.create({
          UserId: userFound.id,
          productId: productId,
          amount: amount,
          product: product,
          quantity: quantity
        })
          .then(function (newOrder) {
            done(newOrder);
          });
      } else {
        res.status(404).json({ 'error': 'Utilisateur introuvable' });
      }
    },
    // 3. Confirmation une fois fait
  ],
    function (newOrder) {
    if (newOrder) {
      return res.status(201).json(newOrder);
    } else {
      return res.status(500).json({ 'error': 'Le message ne peut être publié' });
    }
  })
};
  // Controllers por effacer un message grâce a l'ID
exports.deleteOrder = (req, res, next) => {
  
    asyncLib.waterfall([

      // Vérification que la requête est envoye d'un compte existant
      function (done) {
        models.User.findOne({
          attributes: ['isAdmin'],
          where: { isAdmin: true }
        }).then(function (userFound) {
          done(null, userFound);
        })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'Utilisateur inexistant' });
          });
      },

      // Affichage du message ciblé
      function (userFound, done) {
        models.Order.findOne({
          where: { id: req.params.id }
        })
          .then(function (orderFound) {
            done(null, userFound, orderFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'Commande non trouvée' });
          });
      },

      function (userFound, orderFound) {

        // Vérification que l'utilisateur est l'auteur du ordere
        if ( userFound.isAdmin == true) { // ou s'il est admin

          // Suppression du message
          models.Order.destroy({
            where: { id: req.params.id }
          })
            .then(() => res.status(200).json({ message: 'commande supprimée !' }))
            .catch(error => res.status(400).json({ message: "commande introuvable", error: error }))

        } else {
          res.status(401).json({ 'error': 'utilisateur non autorisé' });
        }
      },
    ],

      function (userFound) {
        if (userFound) {
          return res.status(201).json({ 'message': 'commande effacée' });
        } else {
          return res.status(500).json({ 'error': 'Impossible d\'effacer la commande' });
        }
      })
    
  };

  // Controllers pour afficher toutes les messages
  exports.getAllOrders = (req, res, next) => {
    const fields = req.query.fields; // DB table fields to load
    const limit = parseInt(req.query.limit); // Limits the number..
    const offset = parseInt(req.query.offset); // ..of orders loaded
    const order = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    asyncLib.waterfall([

      // 2. Affiche les order par username
      function (done) {
        models.Order.findAll({
          // Test des input de l'utilisateur
          order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
          attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
          limit: (!isNaN(limit)) ? limit : null,
          offset: (!isNaN(offset)) ? offset : null,
          include: [{ // Relie le message avec les tables User and Comments  
            model: models.User
          },
            {model: models.Product},
          
        ]
        }).then(function (orders) {
          done(orders)
        }).catch(function (err) {
          console.log(err);
          res.status(500).json({ "error": "Champs invalide" });
        });
      },
      // 3. Confirmation, une fois vérifié
    ],
      function (orders) {
        if (orders) {
          return res.status(201).json(orders);
        } else {
          return res.status(500).json({ 'error': 'Les commandes ne peuvent être affichées' });
        }
      })
  }

