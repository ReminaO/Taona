//import des modules
const dotenv = require('dotenv');
dotenv.config();
require('./database.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//import des routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const commentRoutes = require('./routes/comments');
const orderRoutes = require('./routes/orders');

const app = express();

//Mise en place des headers pour autoriser la communication entre nos deux serveurs front et back
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

//Définition du chemin contenant les images
app.use('/images', express.static(path.join(__dirname, 'images/avatars')));
app.use('/images', express.static(path.join(__dirname, 'images/products')));

//Définition du chemin des routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);


module.exports = app;