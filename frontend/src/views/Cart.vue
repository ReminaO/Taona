<template>
    <section>
      <div class="product-container" v-if="$store.state.cart.length > 0">
        <div class="product-header">
          <h5 class="product-title">Article <span v-if="$store.state.cart.length >1"> s </span></h5>
          <h5 class="price">Prix</h5>
          <h5 class="quantity">Quantité</h5>
          <h5 class="total">Sous-total</h5>
        </div>
        <div v-for="cart in carts" :key="cart.id" class="cart-container">
          <div class= "product">
            <i @click="removeItem(cart)" class="bi bi-trash3"></i>
            <img :src="cart.img" :alt="cart.name">
            <span> {{cart.name}}</span>
          </div>
          <div class="price">{{cart.price / 100}} €</div>
          <div class="quantity">{{cart.quantity}}</div>
          <div class="total" ref="subTotal">{{cart.quantity * cart.price / 100}}€</div>
        </div>
        <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">Total</h4>
          <h4 class="basketTotal"> = {{total}}€</h4>
        </div>
      </div>
      <div class="emptyBasket-container" v-else>
        <h1>Panier Vide</h1>
        <img src="../assets/img/Logo3.png" alt="Logo"/>
      </div>
    </section>
</template>

<script>
let cart = localStorage.getItem('cart')
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// @ is an alias to /src
export default {
  name: 'Cart',
  components: {
    
  },
  data () {
    return {
      
    }
  },
  computed:{
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
    
  }
}
</script>
<style scoped>
.emptyBasket-container img{
  height: 300px;
  margin:0;
  padding:0
}
.emptyBasket-container {
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
    margin-top: 50px;
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
    }

    .total {
      width: 10%;
      display: flex;
      align-items: center;
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

    .basketTotalTitle{
      width: 5%;
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
</style>
