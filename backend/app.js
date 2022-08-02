//import des modules
const dotenv = require('dotenv');
dotenv.config();
require('./database.js');
const express = require('express');
const path = require('path');
var cors = require('cors')
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LMyQ9DVJPzOBtu2WpIJCcStAxhyRn3NOfs0AbemTYFckVVuOck6t9YSyoc595vlTHSLVvX27mYulG2RK3mfElgz00vDkW81M0');

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
app.post('https://sandbox-api.aftership.com/postmen/v3/shipper-accounts');
app.post('https://sandbox-api.aftership.com/postmen/v3/labels');


app.post("/create-payment-intent", async (req, res) => {
    const items = req.body.amount;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: items,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = app;