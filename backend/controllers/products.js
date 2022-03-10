//Import des modules
const asyncLib = require('async');
//import des modèles
const models = require('../models');


// Controllers pour créer un message
exports.createProducts = (req, res) => {
  

  // Paramètres
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = 0;
  //Vérification d'un fichier existant ou laisse le lien vide
  const img = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[0].filename}` : null;
  const thumbImg1 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[1].filename}` : null;
  const thumbImg2 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[2].filename}` : null;
  const thumbImg3 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[3].filename}` : null;
  const thumbVideo = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[4].filename}` : null;

  console.log(req.files)
  
  
  //Vérification que le titre et le contenu ne soit pas nul
  if (name == null || description == null || price == null) {
    return res.status(400).json({ 'error': 'champs manquant' });
  }

  asyncLib.waterfall([

    // 1. Vérification de l'existance de l'utilisateur
    function(done) { // done = paramètre principal
      models.User.findOne({
        attributes: ['id','isAdmin'],
        where: { id: req.params.id }
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
        // console.log(req.files)
        if (userFound.isAdmin == true) {
        models.Product.create({
            
            UserId: userFound.id,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            img: img,
            thumbImg1: thumbImg1,
            thumbImg2: thumbImg2,
            thumbImg3: thumbImg3,
            thumbVideo: thumbVideo
          })
            .then(function (newProduct) {
              done(newProduct);
            });
      }
      else {
          res.status(401).json({ 'error': 'utilisateur non autorisé' });
        }
    } 
      else {
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
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = 0;
  //Vérification d'un fichier existant ou laisse le lien vide
  const img = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[0].filename}` : null;
  const thumbImg1 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[1].filename}` : null;
  const thumbImg2 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[2].filename}` : null;
  const thumbImg3 = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[3].filename}` : null;
  const thumbVideo = req.body && req.files ? `${req.protocol}://${req.get('host')}/images/products/${req.files[4].filename}` : null;
  const userId = req.params.userId;
  asyncLib.waterfall([
    // Vérification que la requête est envoye d'un compte existant
    function (done) {
      models.User.findOne({
        where: { id: userId }
      }).then(function (userFound) {
        done(null, userFound);
      })
        .catch(function (err) {
          return res.status(500).json({ 'error': 'Utilisateur inexistant' });
        });
    },

    // Vérification que l'article soit existant
    function (userFound, done) {
      models.Product.findOne({
        attributes: ['id', 'userId'],
        where: { id: req.params.id }
      })
        .then(function (productFound) {
          done(null, userFound, productFound);
        })
        .catch(function (err) {
          return res.status(404).json({ 'error': 'Article non trouvé' });
        });
    },

    function (userFound, productFound) {

      // verifie que l'utilisateur soit admin
      if (userFound.isAdmin == true) {

        // Met a jour l'article'
        productFound.update({
          name : (name ? name : productFound.name),
          description: (description ? description : productFound.description),
          price: (price ? price : productFound.price),
          quantity: (quantity ? quantity : productFound.quantity),
          img : (img ? img : productFound.img),
          thumbImg1 : (thumbImg1 ? thumbImg1 : productFound.thumbImg1),
          thumbImg2 : (thumbImg2 ? thumbImg2 : productFound.thumbImg2),
          thumbImg3 : (thumbImg3 ? thumbImg3 : productFound.thumbImg3),
          thumbVideo: (thumbVideo ? thumbVideo : productFound.thumbVideo)
        })
          .then(() => res.status(200).json({ message: 'Produit modifié !' }))
          .catch(error => res.status(400).json({ message: "Produit introuvable", error: error }))

      } else {
        res.status(401).json({ 'error': 'utilisateur non autorisé' });
      }
    },
  ],

    function (productFound) {
      if (productFound) {
        return res.status(201).json({ 'message': 'Article modifié' });
      } else {
        return res.status(500).json({ 'error': 'Impossible de mettre a jour l\'article' });
      }
    })
}
  // Controllers por effacer un message grâce a l'ID
exports.deleteProduct = (req, res) => {
  //Paramètres
  const userId = req.params.userId;

    asyncLib.waterfall([

      function (done) {
        models.User.findOne({
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'Utilisateur inexistant' });
          });
      },
  
      // Vérification que l'article soit existant
      function (userFound, done) { // done = paramètre principal
          models.Product.findOne({
            where: { id: req.params.id }, 
            attributes: ['id', 'userId'],
        })
          .then(function (productFound) {
            done(null, userFound, productFound);
          })
          .catch(function (err) {
            return res.status(404).json({ 'error': 'Article non trouvé' });
          });
      },

      function (userFound, productFound) {
        // Vérification que l'utilisateur soit admin
        if (userFound.isAdmin == true) { 
          // Suppression du produit
          productFound.destroy({
          })
            .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
            .catch(error => res.status(400).json({ message: "Produit introuvable", error: error }))

        } else {
          res.status(401).json({ 'error': 'utilisateur non autorisé' });
        }
      },
    ],

      function (productFound) {
        if (productFound) {
          return res.status(201).json({ 'message': 'produit effacé' });
        } else {
          return res.status(500).json({ 'error': 'Impossible d\'effacer le produit' });
        }
      })
    
  };

  // Controllers pour afficher toutes les articles
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
  // Controllers pour afficher un article
  exports.getProduct = (req, res) => {

    asyncLib.waterfall([

      // 2. Affiche les article
      function (done) {
        models.Product.findOne({
          where: { id: req.params.id },
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

