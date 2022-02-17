<template>
<div class="container-fluid">
  <h1 class="text-center">Espace Perso</h1>
  <div class="row">
    <div class="col col-xl-10 d-flex flex-column">
      <div class="card formulaire">
        <form @submit="checkForm" class="form-group">
            <!-- Modifier ma photo de profil -->
            <img :src="user.imageUrl"/><br>
            <input v-if='!toggle' class="image" type="file" ref="image" @change="fileSelected()">
            <br><br>
            <label for="isAdmin" v-if='$store.state.user.isAdmin == 1'>Admin</label> <input type="checkbox" v-model="checked" v-if='$store.state.user.isAdmin == 1' id='isAdmin' :checked="$store.state.user.isAdmin"/><br>
            <label for="email"> Email : {{user.email}}</label><br>
            <label for="username">Nom :  {{user.username}}</label><br>
            <label for="bio">Petit mot sur moi : {{user.bio}} </label><br><br>
            <!-- Modifier mes informations de profil -->
            <input v-if='!toggle' class="form-row__input" type="text" id="username" name="username" ref="username" v-model="username" placeholder="Modifier mon nom"> <br><br>
            <textarea v-if='!toggle' class="form-row__input" type="text" id="bio" name="bio" ref="bio" v-model="bio" placeholder="Modifier ma bio"></textarea><br><br>
            <input v-if='!toggle' class="form-row__input" type="password" id="password" name="password" ref="password" v-model="password" placeholder="Modifier le mot de passe**"> <br><br>
            <p v-if='!toggle'>**Champs obligatoires</p>
            <p v-if="errors.length && !toggle">
              <b class="text-danger">Merci de corriger l'erreur suivante:</b>
              <ul>
                <p class="text-danger text-center" v-for="error in errors" :key='error.index'>{{ error }}</p>
              </ul>
            </p>
            <button v-if='!toggle' class="button btn-primary" data-bs-toggle="button" autocomplete="off">
              Enregistrer
            </button><br>
        </form><br>
        <div class="form-row">
          <button v-if='!toggle' class="button btn-primary" data-bs-toggle="button" autocomplete="off">
            Annuler
          </button><br><br>
          <button v-if='!toggle' class="button btn-danger" data-bs-toggle="button" autocomplete="off">
            Supprimer
          </button> <br>
          <button @click="toggle = !toggle" class="button btn-primary" data-bs-toggle="button" autocomplete="off">
            Modifier
          </button><br>
          <button @click="logout()" class="button btn-primary" data-bs-toggle="button" autocomplete="off">
            Déconnexion
          </button><br>
        </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  data (){
    return {
      toggle: true,
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postal_code: '',
      phone_number: '',
      password:'',
      errors: []
    }
  },
  mounted: function () {
    const self = this;
    console.log(self.$store.state.user);
    if (self.$store.state.user.userId == -1) {
      self.$router.push('/');
      return ;
    }
    self.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
html, body{
  height: 100%;
  width: 100%;
}
.container-fluid {
  margin: 0;
  padding: 0;
}
.card {
  margin: 5% 15%;
  width: 75%;
  padding:15px;
  flex-wrap: wrap;
  border-radius: 30px;
  background-color: rgb(247, 245, 245);
  }
img {
  height: 150px;
  object-fit: contain;
}
.form-row {
  display: flex;
  flex-direction: column;
}
.form-group {
  text-align: center;
}
.form-row__input {
  padding:8px;
  border: none;
  border-radius: 8px;
  background:#f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex:1;
  min-width: 100px;
  color: black;
}
.formulaire {
  display: flex;
}
button {
  margin : 0 25%;
  width: 50%;
  background-color: rgb(9, 31, 67);
}
.btn-danger {
  border : 3px solid rgb(209, 81, 90);
  background-color: rgb(209, 81, 90);
}
label {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
}
.row {
  display: flex;
  justify-content: center;
  --bs-gutter-x: 0
}

</style>