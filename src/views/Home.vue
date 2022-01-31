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
<main class="container-fluid d-flex justify-content-center text-center">
  <div class="row d-flex justify-content-center w-100">
    <div class="product col w-100">
      <router-link to="/articles"><img src="../assets/logo.png" alt="Photo Produits"></router-link>
      <p class="title-product">Produits</p>
    </div>
    <div class="product col w-100">
      <router-link to="/astuces"><img src="../assets/logo.png" alt="Photo Astuces"></router-link>
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
 main .container-fluid{
  width: 100%;
  margin:0
} 
.product{
  position: relative;
  border: #d4a449 1px solid;
  margin: 30px;
  border-radius: 10px;
  -webkit-box-shadow: 0.5px 0.5px 10px 1px rgba(0,0,0,0.1);
  box-shadow: 0.5px 0.5px 10px 1px rgba(0,0,0,0.1);
}
.product:hover {
  text-decoration: underline;
  transform: scale(1.03);
  transition: transform 0.9s;
  cursor: pointer;
}
.title-product, .title-tips {
  position: absolute;
  bottom: 55px;
  left: 45%;
  backdrop-filter: blur(10px);
  font-size: 1.6rem;
}
.title-product:hover, .title-tips:hover {
  text-decoration: underline;
}

</style>
