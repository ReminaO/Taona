<template>
<div class="container-fluid">
  <h1 class="text-center">Mon compte</h1>
  <div class="row">
    <div class="col col-xl-10 form-container">
      <aside class="formulaire">
        <form @submit.prevent="checkForm" class="form-group identity-details-container">
            <!-- Modifier ma photo de profil -->
            <div class="identity-container">
              <div class="avatar">
                <img :src="user.avatar"/><br>
                <input v-if='!img_toggle' class="image" type="file" ref="image" @change="fileSelected()"><br>
                <button @click="img_toggle = !img_toggle || updateToggle()" class="update-button">
                  Modifier
                </button><br>
                <button v-if='!img_toggle' class="button" >
                  Enregistrer
                </button><br>
                <button v-if='!img_toggle' @click="reload()" class="button">
                  Annuler
                </button><br>
              </div>
              
              <br><br>
              <div>
                <label for="username">{{user.firstName}} </label>
                <label for="username"> {{user.lastName}}</label><br>
                <label for="email"> {{user.email}}</label><br>
              </div>
            </div>
            </form >
        </aside>
        <section>
          <form @submit.prevent class="form-group address-container">
            <div>
              <label>Données personnelles:</label><br><br>
              <label for="address">Adresse : {{user.address}} </label><br> <textarea class="form-row__input" type="text" id="address" name="address" ref="address" v-model="address" placeholder="Adresse"></textarea><br>
              <label for="postal_code">Code postal : {{user.postal_code}}</label><br><input  class="form-row__input" type="text" id="postal_code" name="postal_code" ref="postal_code" v-model="postal_code" placeholder="code postal"> <br>
              <label for="city">Ville : {{user.city}}</label><br><input  class="form-row__input" type="text" id="city" name="city" ref="city" v-model="city" placeholder="Ville"> <br><br>
              <button  class="button" >
                Enregistrer
              </button>
              
            </div>
          </form> <br>
          <form @submit.prevent class="form-group phone-container"> 
            <label for="phone_number">Téléphone : 0{{user.phone_number}} </label><br><input class="form-row__input" type="text" id="phone_number" name="phone_number" ref="phone_number" v-model="phone_number" placeholder="Téléphone"> <br>
            <button class="button" >
              Enregistrer
            </button>
          </form>
        </section>  
        <section class="form-group">
          <form @submit.prevent>
              <label for="phone_number">Modifier le mot de passe </label><br><input v-if='!pwd_toggle' class="form-row__input" type="password" id="password" name="password" ref="password" v-model="password" placeholder="Mot de passe" @keyup='check()'> <br>
              <label v-if='!pwd_toggle'>Confirmer le mot de passe: </label><br><input v-if='!pwd_toggle' type="password" name="confirm_password" class="form-row__input" id="confirm_password"  @keyup='check();' /> <br><br>
                <span id='message'></span>
              
              <button @click="pwd_toggle = !pwd_toggle || updateToggle()" class="update-button">
                Modifier
              </button>
              <button v-if='!pwd_toggle' class="button" >
                Enregistrer
              </button><br><br>
              <button v-if='!pwd_toggle ' @click="reload()" class="button">
                Annuler
              </button><br>
          </form>
        </section>  
    </div>
    <form @submit.prevent class="password-container">
      <button class="button btn-danger" data-bs-toggle="button" autocomplete="off">
        Supprimer le compte
      </button><br>
      <button @click="logout()" class="button btn-primary" data-bs-toggle="button" autocomplete="off">
        Déconnexion
      </button><br>
    </form>
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
      phone_toggle: true,
      img_toggle: true,
      pwd_toggle: true,
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
    },
    updateToggle: function () {
      let btn = document.querySelectorAll('.update-button')
      btn.forEach(item =>{
        item.style.display ="none"
      })
    },
    reload: function() {
      location.reload();
    },
    check: function() {
      if(document.getElementById('password').value.length >= 1) {
          if (document.getElementById('password').value ==
          document.getElementById('confirm_password').value) {
          document.getElementById('message').style.color = 'green';
          document.getElementById('message').innerHTML = 'Mot de passe identique';
        } else {
          document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'Mot de passe non identique';
        }
      }
    }
  }
}
</script>

<style scoped>
h1{
  margin: 50px
}
.container-fluid {
  margin: 0;
  padding: 0;
}
.form-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px
}
.form-row {
  display: flex;
  flex-direction: column;
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
.phone-container{
  display:flex;
  flex-direction: column;
  justify-content: center
  align
}
button {
  margin : 0 0;
  width: 100%;
  background-color:#d4a449;
  color:rgba(255,255,255,1);
  border-radius: 8px;
  padding: 10px 25px;
  font-size: 20px;
  border: none;
}
button:hover {
    background-color:#b46773;
    color:rgba(255,255,255,1);
}
.btn-danger {
  border : 3px solid rgb(209, 81, 90);
  background-color: rgb(209, 81, 90);
}
label {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
}
.identity-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.identity-details-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar img{
  height: 150px
}
.password-container button {
  width: 25%
}
.password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.row{
  --bs-gutter-x: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>