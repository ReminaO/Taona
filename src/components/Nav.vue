<template>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TaonaBox</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Produits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Astuces</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Panier</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Mon compte
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Mon Profil</a></li>
              <li><a class="dropdown-item" href="#">Mes Commandes</a></li>
              <li><a class="dropdown-item" href="#">Déconexion</a></li>
            </ul>
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

}
</script>
<style scoped>
.navbar{
  background-color:maroon;
}
img { 
  height: 50px;
}
.container-fluid {
  padding:0;
  margin: 0;
}
</style>