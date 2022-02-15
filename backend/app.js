//import des modules
const dotenv = require('dotenv');
dotenv.config();
require('./database.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')

//import des routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const commentRoutes = require('./routes/comments');
const orderRoutes = require('./routes/orders');

const app = express();

//Mise en place des headers pour autoriser la communication entre nos deux serveurs front et back
app.use(cors());
app.options('*', cors())

app.use(bodyParser.json());

//Définition du chemin contenant les images
app.use( "images/avatars", express.static(path.join(__dirname, 'images/avatars')));
app.use("images/products", express.static(path.join(__dirname, 'images/products')));

//Définition du chemin des routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);


module.exports = app;