<template>
<header>
  <Caroussel />
  <div class="p-5 mb-4 bg-light rounded-3 jumbotron">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Découvrez Taona Cosmetics</h1>
      <p class="col-md-8 fs-4">Sublimez vos cheveux et ceux de vos proches, grâce à la Taona Box. Pas moins de 8 accessoires pour prendre soin de votre chevelure !</p>
    </div>
  </div>
</header>
<main class="container row d-flex text-center">
  <div class="row">
    <div class="col-5">
      <router-link to="/articles"><p class="product text-center"><img src="../assets/logo.png" alt="Produits" class="w-75"></p></router-link>
      <p class="title-product">Produits</p>
    </div>
    <div class="col-5">
      <router-link to="/articles"><p class="product text-center "><img src="../assets/logo.png" alt="Produits" class="w-75"></p></router-link>
      <p class="title-tips">Astuces</p>
    </div>
  </div>
</main>  

</template>

<script>
// @ is an alias to /src
import Caroussel from'@/components/Caroussel'
export default {
  name: 'Home',
  components: {
   Caroussel
  }
}
</script>
<style scoped>
/* row{
  backdrop-filter: blur(10px);
} */
.product{
  position: relative;
  border: #d4a449 1px solid;
  margin: 30px;
  border-radius: 35%;
}
.title-product {
  position: absolute;
  bottom: 50px;
  left: 12%;
  backdrop-filter: blur(10px);
  font-size: 30px;
}
.title-tips {
  position: absolute;
  bottom: 50px;
  left:39%;
  backdrop-filter: blur(10px);
  font-size: 30px;
}
.title-product:hover {
  text-decoration: underline;
}
.title-tips:hover {
  text-decoration: underline;
}

</style>
