<template>
  <section>
    <div class="p-5 mb-4 banner jumbotron">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Nos Articles</h1>
        <p class="col-md-8 fs-4">Sublimez vos cheveux et ceux de vos proches, grâce à la Taona Box. Pas moins de 8 accessoires pour prendre soin de votre chevelure !</p>
      </div>
    </div>
    <Produits />
  </section>
</template>

<script>
// @ is an alias to /src
import Produits from'@/components/ProduitsList'
export default {
  name: 'Products',
  components: {
    Produits
  }
}
</script>
<style scoped>
.card{
  margin: 30px
}
.banner{
  background-color: #672932;
  color: #d4a449;
  -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
  box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
}
</style>