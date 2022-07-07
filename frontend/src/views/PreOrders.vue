<template>
    <section>
        <div class="p-5 mb-4 banner jumbotron">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Résumé de votre commande</h1>
                <p class="col-md-8 fs-4">Sublimez vos cheveux et ceux de vos proches, grâce à la Taona Box. Pas moins de 8 accessoires pour prendre soin de votre chevelure !</p>
            </div>
        </div> 
        <div class="product-container" v-if="$store.state.cart.length > 0">
            <div class="product-header">
            <h5 class="product-title">Article <span v-if="$store.state.cart.length >1"> s </span></h5>
            <h5 class="price">Prix</h5>
            <h5 class="quantity">Quantité</h5>
            <h5 class="total">Sous-total</h5>
            </div>   
            <div v-for="cart in carts" :key="cart.id" class="cart-container">
                <div class= "product">
                    <img :src="cart.img" :alt="cart.name">
                    <span> {{cart.name}}</span>
                </div>
                <div class="price">{{cart.price / 100}} €</div>
                <div class="quantity">
                    <button @click="removeQuantity(cart)">-</button>
                    <span class="quantity-span">{{cart.quantity}}</span>
                    <button @click="addQuantity(cart)">+</button>
                </div>
                <div class="total" ref="subTotal">{{cart.quantity * cart.price / 100}}€</div>
            </div>
            <div class="promotionContainer">
                <h4 class="basketTotalTitle">Promotion</h4>
                <h4 class="basketTotal"> = %</h4>
            </div>
            <div class="deliveryContainer">
                <h4 class="basketTotalTitle">Frais de Livraison</h4>
                <h4 class="basketTotal" v-if="total > 2500"> = Gratuit</h4>
                <h4 class="basketTotal" v-else> = 4.55€</h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal" v-if="total > 2500"> = {{(total / 100)}}€</h4>
                <h4 class="basketTotal" v-else> = {{(total / 100) + 4.55}}€</h4>
            </div>
            <div class="check-container">
                <router-link to="/infolivraison"><button class="btn check-btn">
                    Confirmer la commande
                </button></router-link>
            </div>
        </div>
        <div class="emptyBasket-container" v-else>
            <h1>Panier Vide</h1>
            <img src="../assets/img/Logo3.png" class="img-fluid" alt="Logo"/>
        </div>
    </section>
</template>

<script>

export default {
    computed: {
        carts() {
            return this.$store.state.cart
        },
        total() {
        let price = 0;
        this.$store.state.cart.map(item => {
            price += item["quantity"] * item["price"]
        })
        return price
        }
    },
    methods:{
        removeItem(index){
            this.carts.splice(this.carts.indexOf(index), 1)
        },
        addQuantity (product) {
            this.$store.dispatch('addItem', product)
        },
        removeQuantity (product) {
            this.$store.dispatch('removeItem', product)
        }
    }
}
</script>

<style scoped>
.banner{
    background-color: #672932;
    color: #d4a449;
    -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
    box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
}
.check-container{
    display:flex;
}
.nav-link{
    background-color: #672932;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
    border: none;
    margin: 0;
    /* width: 40% */
}
.nav-link:hover {
    background-color: #b46773;
    color:rgba(255,255,255,1);
}
.emptyBasket-container img, .connexion-container img{
    height: 300px;
    margin:0;
    padding:0
}
.emptyBasket-container, .connexion-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 100px;
    color: #672932
}
    .product-container{
        max-width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin:0 auto;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .product-header {
        max-width: 100%;
        display: flex;
        justify-content: center;
        /* margin: 0 auto; */
        border-bottom: #672932 4px solid;
    }

    .product-title {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .price {
        width : 20%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .total {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .cart-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        border-bottom: #672932 2px solid;
    }

    .quantity {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .product img {
        display: flex;
        width: 20%;
        height: 70px;
        object-fit: cover;
        margin-left: 30px;
        margin-right: 30px
    }

    .basketTotalContainer{
        display:flex;
        justify-content: flex-end;
        width: 100%;
        padding: 10px 0;
        border-top: #672932 4px solid;

    }
    .promotionContainer{
        display:flex;
        justify-content: flex-end;
        width: 100%;
        padding: 10px 0;
        border-top: #672932 4px solid;
    }
    .deliveryContainer{
        display:flex;
        justify-content: flex-end;
        width: 100%;
        padding: 10px 0;
    }
    .basketTotalTitle{
        width: 100%;
    }

    .basketTotal {
        width : 15%;
    }

    .product {
        width: 35%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 0;
        
    }

    .product a {
        position: relative;
        top : 15%;
    }

    i {
        cursor: pointer;
    }

    button {
    background-color:#d4a449;
    color:rgba(255,255,255,1);
    border-radius: 8px;
    padding: 5px 15px;
    font-size: 20px;
    border: none;
}
.quantity-span{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 5px;
    border: 1px #672932 solid;
    border-radius: 5px
}
.check-btn {
    /* position: relative;
    left: 75%;
    width: 25%; */
    margin-bottom: 50px;
    margin-top: 50px;
}
.check-btn:hover{
    background-color: #672932;
    color: white
}
@media screen and (max-width: 500px)
{/*Style page du panier*/
    .product-container{
        max-width: 100%;
        display: flex;
        flex-direction: column;
        margin:0 auto;
        margin-top: 50px;
    }

    .product-container img {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
    .product-header {
        display: flex;
    }
    .cart-container {
        display: flex;
        flex-wrap: wrap;
    }

    .color{
        visibility: hidden;
        width: 0%;
    }

    .color-choice{
        visibility: hidden;
        width: 0%;
    }

    .price {
        visibility: hidden;
        width: 0%;
    }

    .quantity {
        visibility: hidden;
        width: 0%;
    }
    
    .total {
        width: 20%;
        align-items: center;
    }

    .product span {
        width : 0%;
        visibility: hidden;
    }
    .product  {
        width : 80%;
        align-items: center;
    }

    .product-title {
        width : 100%
    }

    .basketTotalTitle{
        width: 100%;
    }
    
    .basketTotal {
        width : 45%;
    }

    .basketTotalContainer{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 0;
    }
    .promotionContainer{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 0;
        border-top: #672932 4px solid;
    }
  }
</style>