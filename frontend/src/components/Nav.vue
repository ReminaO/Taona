<template>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <div>
        <router-link class="navbar-brand" to="/"><img src="../assets/img/Logo3.png" alt="Logo TaonaCosmetics">TaonaCosmetics</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/articles">Produits</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Astuces</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"  to="/panier">Panier <span class="text-center cart align-middle" >{{cartCount}}</span></router-link>
          </li>
          <li v-if="$store.state.user.userId == -1" class="nav-item">
            <router-link class="nav-link" to="/connexion">Connexion</router-link>
          </li>
          <!-- <li v-if="$store.state.user.userId == -1" class="nav-item">
            <router-link class="nav-link" to="/confirmnews">NewsletterConfirm</router-link>
          </li> -->
            
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Mon compte
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><router-link class="dropdown-item" to="/profil">Mon Profil</router-link></li>
              <li><router-link class="dropdown-item" to="/commandes">Mes Commandes</router-link></li>
              <li><a class="dropdown-item" @click="logout" href="#">Déconnexion</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkout">Checkout</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/infolivraison">Livraison</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/validation">Validation</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Nav',
    computed: {
      cart(){
        return this.$store.state.cart
    },
      cartCount(){
      let quantity = 0
      this.cart.forEach(item =>{
        quantity +=item.quantity
      })
      return quantity
      }
  
  },
    methods:{
    logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      }
    },
    mounted(){
      localStorage.setItem("quantity", this.cartCount)
    }

}

</script>
<style scoped>
.navbar{
  background-color:#333333;
  -webkit-box-shadow: 0 5px 5px 0 rgba(0,0,0,0.1);
box-shadow: 0 5px 5px 0 rgba(0,0,0,0.1);
}
img { 
  height: 50px;
}
.container-fluid {
  padding:0;
  margin: 0;
}
.cart {
  background-color: aliceblue;
  color:grey;
  border-radius: 50px;
  padding-left: 6px;
  padding-right: 6px;
  
}
</style>