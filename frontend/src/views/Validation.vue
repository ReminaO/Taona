<template>
<main>
    <div class="p-5 mb-4 banner jumbotron">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Merci !</h1>
            <p class="col-md-8 fs-4">Merci d'avoir choisis Taona Cosmetics pour vos soins capillaires</p>
        </div>
    </div>
    <section>
        <h2 class="text-center">Votre commande d'un montant de {{total/100}}€ a bien été prise en compte</h2>
        <p>Résumé de votre commande:</p>
        <div class="resume-container ">
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
                    <span class="quantity-span">{{cart.quantity}}</span>
                </div>
                <div class="total" ref="subTotal">{{cart.quantity * cart.price / 100}}€</div>
                </div>
            </div>
        </div>    
    </section>
</main>
</template>

<script>
export default {
    name:"Validation",
    data(){
        return {
            total: localStorage.getItem('totalCart'),
            carts:this.$store.state.cart
        }
    },
}
</script>

<style scoped>
section{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    margin-bottom:100px;
}
h2,p{
    color:#672932
}
.resume-container {
    width: 50%;
    margin-bottom: 50px;
    border:#672932 solid 1px;
    border-radius:10px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.product-container{
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin:0 auto;
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
    /* border-bottom: #672932 2px solid; */
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
    height: 50px;
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

.basketTotalTitle{
    width: 10%;
}

.basketTotal {
    width : 10%;
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

@media screen and (max-width: 550px)
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
        width: 40%;
    }
    
    .basketTotal {
        width : 50%;
    }

    .basketTotalContainer{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 0;
        border-top: #672932 4px solid;
    }
  }
    
</style>