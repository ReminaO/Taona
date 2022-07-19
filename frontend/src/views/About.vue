<template>
  <main>
    <div class="p-5 mb-4 banner jumbotron">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Qui sommes nous ?</h1>
        <p class="col-md-8 fs-4">Découvrez quelles les valeurs chères a Taona Cosmétics</p>
      </div>
    </div>
    <section class="values-container">
      <div class='logo'>
        <img src="../assets/img/Logo3.png" alt="logo-Taona">
      </div>
      <div class="description">
        <h1>Qui sommes-nous ?</h1>
        <p>Nous sommes dans une époque où chacune de nous a envie d’être bien dans sa tête et dans son corps. Et cela passe aussi par les cheveux. Mais s’occuper de cheveux crépus/frisés/bouclés peut être compliqué pour beaucoup d’entre nous. Souvent par manque de connaissances de nos cheveux, nous n’arrivons pas à les sublimer pleinement. </p>
        <p>Pourtant avec les bons accessoires et les bons gestes, il est possible de les magnifier. </p>
        <p>C’est pour cette raison que TAONA Cosmetics a été créé. </p>
        <p>Le but est de sublimer les cheveux texturés de la manière la plus douce possible. Pour cela, TAONA propose tous les accessoires dont une femme aux cheveux frisés/crépus/bouclés a besoin pour s’occuper facilement et efficacement de ses cheveux. En plus de cela, vous trouverez sur le site des astuces et conseils qui vous aideront à les utiliser au mieux. </p>
        <p>Alors qu’attendez-vous pour sublimer vos cheveux ?</p>
      </div>
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'About',
  components: {
  
  }
}
</script>
<style scoped>
.logo img{
    height: 300px;
    object-fit: cover;
  }
  .values-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:#672932;
  }
  .values-container p {
    font-size: 25px;
  }
  .description{
    margin: 80px
  }
  h1 {
    margin-bottom: 50px;
  }
</style>
