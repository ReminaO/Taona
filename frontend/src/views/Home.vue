<template>
  <main>
    <div class="p-5 mb-4 banner jumbotron">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Découvrez Taona Cosmetics</h1>
        <p class="col-md-8 fs-4">Sublimez vos cheveux et ceux de vos proches, grâce à la Taona Box. Pas moins de 8 accessoires pour prendre soin de votre chevelure !</p>
      </div>
    </div>
    <Caroussel />
    
    <div class="container-fluid  mt-4 ">
      <div class="row product-container d-flex justify-content-center text-center">
        <hr>
        <div class="product col col-6 w-25">
          <router-link to="/articles"><img src="../assets/img/card.png" alt="Photo Produits">
            <p class="title-product">Produits</p>
          </router-link>
        </div>
        <div class="product col col-6 w-25">
          <router-link to="/astuces"><img src="../assets/img/card.png" alt="Photo Astuces">
            <p class="title-tips">Astuces</p>
          </router-link>
        </div>
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
  margin: 30px;
}
.product:hover {
  text-decoration: underline;
  transform: scale(1.03);
  transition: transform 0.9s;
  cursor: pointer;
}
.title-product, .title-tips {
  position: absolute;
  bottom: 100px;
  left: 39%;
  backdrop-filter: blur(10px);
  background-color: white;
  border-radius: 10px;
  font-size: 1.6rem;
  color: #672932;
  padding-left: 10px;
  padding-right: 10px;
}
.title-product:hover, .title-tips:hover {
  text-decoration: underline;
}
.banner{
  background-color: #672932;
  color: #d4a449;
  -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
  box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
}
hr{
  color:#d4a449;
}
img{
  object-fit: contain;
  height: 300px;
  border: #d4a449 1px solid;
  border-radius: 10px;
  -webkit-box-shadow: 0.5px 0.5px 10px 1px rgba(0,0,0,0.1);
  box-shadow: 0.5px 0.5px 10px 1px rgba(0,0,0,0.1);
}
.product-container {
  margin: 100px
}
@media screen and (max-width: 800px){
  .product-container{
    flex-direction: column;
    align-items: flex-start;
  }
  .title-product, .title-tips {
  position: absolute;
  bottom: 60px;
  left: 85%;
  }
  img{
    height: 200px
  }
}
</style>
