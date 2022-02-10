//Import des modules
const asyncLib = require('async');
//import des modèles
const models = require('../models');


// Controllers pour créer un message
exports.createProducts = (req, res) => {
  

  // Paramètres
  const name   = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  //Vérification d'un fichier existant ou laisse le lien vide
  const img = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg1 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg2 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg3 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImgVideo = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

  
  
  
  //Vérification que le titre et le contenu ne soit pas nul
  if (name == null || description == null || price == null) {
    return res.status(400).json({ 'error': 'champs manquant' });
  }

  asyncLib.waterfall([

    // 1. Vérification de l'existance de l'utilisateur
    function(done) { // done = paramètre principal
      models.User.findOne({
              attributes: ['isAdmin'],
              where: { isAdmin: true }
          })
          .then(function(userFound) { // userFound sera le paramètre suivant
              done(null, userFound);
          })
          .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
          });
  },
      
    // 2. Une fois trouvé crée le produit avec l'input
    function (userFound, done) {
      if (userFound) {
        models.Product.create({
          name : name,
          description: description,
          price: price,
          img : img,
          thumbImg1 : thumbImg1,
          thumbImg2 : thumbImg2,
          thumbImg3 : thumbImg3,
          thumbImgVideo: thumbImgVideo
        })
          .then(function (newProduct) {
            done(newProduct);
          });
      } else {
        res.status(404).json({ 'error': 'Utilisateur introuvable' });
      }
    },
    // 3. Confirmation une fois fait
  ],
    function (newProduct) {
    if (newProduct) {
      return res.status(201).json(newProduct);
    } else {
      return res.status(500).json({ 'error': 'Le produit ne peut être publié' });
    }
  })
};

exports.modifyProduct = (req, res) => {
  // Paramètres
  const name   = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  //Vérification d'un fichier existant ou laisse le lien vide
  const img = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg1 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg2 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImg3 = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const thumbImgVideo = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

  asyncLib.waterfall([

    // Vérification que la requête soit envoyé d'un compte existant
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
      models.Product.findOne({
        where: { id: req.params.id }
      })
        .then(function (productFound) {
          done(null, userFound, productFound);
        })
        .catch(function (err) {
          return res.status(500).json({ 'error': 'Message non trouvé' });
        });
    },

    function (userFound, productFound) {

      // verifie que l'utilisateur soit l'auteur du product
      if (userFound.isAdmin == true) { // ou soit admin

        // Met a jour le product
        productFound.update({
          name : name,
          description: description,
          price: price,
          img : img,
          thumbImg1 : thumbImg1,
          thumbImg2 : thumbImg2,
          thumbImg3 : thumbImg3,
          thumbImgVideo: thumbImgVideo
        })
          .then(() => res.status(200).json({ message: 'Produit modifié !' }))
          .catch(error => res.status(400).json({ message: "Produit introuvable", error: error }))

      } else {
        res.status(401).json({ 'error': 'utilisateur non autorisé' });
      }
    },
  ],

    function (userFound) {
      if (userFound) {
        return res.status(201).json({ 'message': 'Article modifié' });
      } else {
        return res.status(500).json({ 'error': 'Impossible de mettre a jour l\'article' });
      }
    })
}
  // Controllers por effacer un message grâce a l'ID
exports.deleteProduct = (req, res) => {
  
    asyncLib.waterfall([

      // 1. Vérification de l'existance de l'utilisateur
    function(done) { // done = paramètre principal
      models.User.findOne({
              attributes: ['isAdmin'],
              where: { isAdmin: true }
          })
          .then(function(userFound) { // userFound sera le paramètre suivant
              done(null, userFound);
          })
          .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
          });
  },

      // Affichage du message ciblé
      function (userFound, done) {
        models.Product.findOne({
          where: { id: req.params.id }
        })
          .then(function (productFound) {
            done(null, userFound, productFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'Message non trouvé' });
          });
      },

      function (userFound, productFound) {

        // Vérification que l'utilisateur est admin
        if (userFound.isAdmin == true) { 

          // Suppression du produit
          models.Product.destroy({
            where: { id: req.params.id }
          })
            .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
            .catch(error => res.status(400).json({ message: "Produit introuvable", error: error }))

        } else {
          res.status(401).json({ 'error': 'utilisateur non autorisé' });
        }
      },
    ],

      function (userFound) {
        if (userFound) {
          return res.status(201).json({ 'message': 'produit effacé' });
        } else {
          return res.status(500).json({ 'error': 'Impossible d\'effacer le produit' });
        }
      })
    
  };

  // Controllers pour afficher toutes les messages
  exports.getAllProducts = (req, res) => {

    asyncLib.waterfall([

      // 2. Affiche les article
      function (done) {
        models.Product.findAll({
          include: [{ // Relie le produit avec la tables Comments  
            model: models.Comment,
          }
        ]
        }).then(function (products) {
          done(products)
        }).catch(function (err) {
          console.log(err);
          res.status(500).json({ "error": "Champs invalide" });
        });
      },
      // 3. Confirmation, une fois vérifié
    ],
      function (products) {
        if (products) {
          return res.status(201).json(products);
        } else {
          return res.status(500).json({ 'error': 'Le produit ne peut être affiché' });
        }
      })
  }

