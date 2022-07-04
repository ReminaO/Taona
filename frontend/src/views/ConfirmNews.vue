<template>
    <main class="news-container">
        <img src="../assets/img/Logo3.png" alt="Logo TaonaCosmetics">
        <h1>Merci d'avoir souscrit à notre newsletter</h1>
        <p>Soyez informé des dernières nouvelles de Taona Cosmetics et profitez de promotions exceptionnelles</p>
        <router-link class="nav-link" aria-current="page" to="/"><i class="bi bi-arrow-left"> </i> Retour à l'accueil</router-link>
    </main>    
</template>
<style scoped>
.news-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #672932;
    margin-bottom: 100px;
}
img{
    height: 250px;
  }
.nav-link{
    color: #672932;
}  
</style>