//import des modules
const dotenv = require('dotenv');
dotenv.config();
require('./database.js');
const express = require('express');
const path = require('path');
var cors = require('cors')

//import des routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const commentRoutes = require('./routes/comments');
const orderRoutes = require('./routes/orders');
const likeRoutes = require('./routes/like');
const newsRoutes = require('./routes/newsletter');

const app = express();

app.use(express.text()) // this is for plan/text format
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies 

//Mise en place des headers pour autoriser la communication entre nos deux serveurs front et back
app.use(cors());
app.options('*', cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

//Définition du chemin contenant les images
app.use("/images/avatars", express.static(path.join(__dirname, 'images/avatars')));
app.use("/images/products", express.static(path.join(__dirname, 'images/products')));

//Définition du chemin des routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/likes', likeRoutes);
app.use('/audience', newsRoutes);



module.exports = app;