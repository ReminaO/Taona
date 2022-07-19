<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/img/peignes-larges.jpg" class="d-block m-auto w-50" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/img/peignes.jpg" class="d-block m-auto w-50" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/img/produits.jpg" class="d-block m-auto w-50" alt="...">
      </div>
    </div>
  </div>
</template>

<style scoped>
img{
  object-fit: contain;
  height: 20rem;
}
@media screen and (max-width: 800px){
  img{
  object-fit: contain;
  height: 20rem;
}

}
@media screen and (max-width: 590px){
img{
  object-fit: contain;
  height: 15rem;
}

}
@media screen and (max-width: 300px){
img{
  object-fit: contain;
  height: 10rem;
}

}
</style>