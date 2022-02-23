<template>
<div class="container-fluid">
  <h1 class="text-center">Mon compte</h1>
  <div class="row">
    <div class="col">
      <aside class="formulaire form-container">
        <form @submit.prevent action="/users/:id/profile" method="PUT" enctype="multipart/form-data" class="form-group identity-details-container">
          <!-- Modifier ma photo de profil -->
          <div class="identity-container">
            <div class="avatar">
              <img :src="user.avatar" alt="Photo de profil"/><br>
              <input v-if='!img_toggle' class="image" type="file" ref="image" name="image" @change="fileSelected()" ><br>
              <button @click="img_toggle = !img_toggle || updateToggle()" class="update-button">
                Modifier
              </button><br>
              <button @click="modifyImg()" v-if='!img_toggle' class="button" >
                Enregistrer
              </button><br>
              <button v-if='!img_toggle' @click="reload()" class="button">
                Annuler
              </button><br>
            </div>
            
            <br>
            <div class="name-container">
              <label for="username">{{user.firstName}} {{user.lastName}} </label><br>
              <label for="email"> {{user.email}}</label><br>
            </div>
          </div>
        </form >
        <form @submit.prevent class="password-container">
          <button @click="deleteProfile()" class="button btn-danger" data-bs-toggle="button" autocomplete="off">
            Supprimer le compte <i class="bi bi-trash3"></i>
          </button><br>
          <button @click="logout()" class="button btn-black" data-bs-toggle="button" autocomplete="off">
            Déconnexion <i class="bi bi-box-arrow-right"></i>
          </button><br>
        </form>
      </aside>
    </div>   
    <div class="col"> 
        <section>
          <form @submit.prevent class="form-group address-container">
            <div class="address-container">
                <h3>Informations personnelles:</h3><br><br>
                <div class="row">
                  <div class="col">
                    <label for="address">Adresse : </label>
                  </div>
                  <div class="col">
                    <textarea class="form-row__input" type="text" id="address" name="address" ref="address" v-model="address" :placeholder="user.address"></textarea>
                  </div>
                </div>  
                <div class="row">
                  <div class="col">
                    <br><br><label for="postal_code"> Code postal : </label>
                  </div>
                  <div class="col">
                    <input  class="form-row__input" type="text" id="postal_code" name="postal_code" ref="postal_code" v-model="postal_code" :placeholder="user.postal_code">
                  </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <br><br><label for="city">Ville : </label>
                    </div>
                    <div class="col">
                      <input  class="form-row__input" type="text" id="city" name="city" ref="city" v-model="city" :placeholder="user.city">
                    </div>
                  </div>
                <div class="row">
                  <div class="col">
                    <br><label for="phone_number">Téléphone :</label>
                  </div>
                  <div class="col">
                    <input class="form-row__input" type="text" id="phone_number" name="phone_number" ref="phone_number" v-model="phone_number" :placeholder="`0${user.phone_number}`">
                  </div>
                </div>
                <div class="row">
                  <div class="col text-center">
                    <button @click="modifyAddress()" class="button" >
                      Enregistrer
                    </button>
                  </div>
              </div>
            </div>
          </form> <br>
          <form @submit.prevent>
            <div class="row">
              <div class="col">
                <br><label for="password">Modifier le mot de passe </label>
              </div>
              <div class="col">
                <input v-if='!pwd_toggle' class="form-row__input" type="password" id="password" name="password" ref="password" v-model="password" placeholder="Mot de passe" @keyup='check()'> <br>
              </div>
              </div>  
              <div class="row">
                <div class="col">
                  <label v-if='!pwd_toggle'>Confirmer le mot de passe: </label><br>
                </div>
                <div class="col">
                  <input v-if='!pwd_toggle' type="password" name="confirm_password" class="form-row__input" id="confirm_password" ref="confirm_password"  placeholder="Confirmer le mot de passe" @keyup='check();' /> <br><br>
                      <span id='message'></span>
                  </div>
                </div>
              <div class="row">
                <div class="col text-center">
                  <button @click="modifyPassword()" v-if='!pwd_toggle' class="button save-btn" >
                    Enregistrer
                  </button><br><br>
                  <button @click="pwd_toggle = !pwd_toggle || updateToggle()" class="update-button">
                    Modifier
                  </button>
                  <button v-if='!pwd_toggle ' @click="reload()" class="button">
                    Annuler
                  </button><br>
                </div> 
              </div> 
          </form>
        </section>  
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
    },
    fileSelected: function () {
      this.image = this.$refs.image.files[0];
      this.user.avatar = URL.createObjectURL(this.image)
        },
    modifyImg: function () {
      let data = {
        avatar : this.image,
      }
      this.$store.dispatch('modifyAvatar', data, {
      }).then(function () {
          location.reload();
      }, function (error) {
          console.log(error);
      })
    },
    modifyAddress: function () {
      let payload ={
        address: this.address,
        postal_code: this.postal_code,
        city: this.city,
        phone_number: this.phone_number
      }
      this.$store.dispatch('modifyAddress', payload, {
        
      }).then(() => {
        location.reload();
      }, function (error) {
          console.log(error);
      })
    },
    modifyPassword: function () {
      let payload = {
        password: this.password
      } 
      if(this.$refs.password.value === this.$refs.confirm_password.value) {
          this.$store.dispatch('modifyPassword', payload,{
        }).then(() => {
          location.reload();
        }, function (error) {
            console.log(error);
        })
      }
    },
    deleteProfile: function () {
      const self = this;
      this.$store.dispatch('deleteProfile', {
      })
      .then(() => {
        alert("Profil supprimé !");
        self.$router.push('/')
        }, function (error) {
            console.log(error);
        })
      
    },
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
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  margin-left: 30px;
  
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
  width: 35%;
  background-color:#d4a449;
  color:rgba(255,255,255,1);
  border-radius: 8px;
  padding: 10px 25px;
  border: none;
  text-align: center;
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
  width: 100%
}
.identity-details-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%
}
.avatar img{
  height: 150px;
  object-fit: contain;
  border-radius: 100px ;
  margin-left : 50px
  
}
.avatar{
  width: 100%;
}
.password-container button {
  width: 35%;
  font-size: 15px;
  
}
.password-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 10px;
}
.row{
  --bs-gutter-x: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-container{
  width: 100%
}
.btn-black{
  background: black;
}
.name-container{
  margin-bottom: 30px
}
</style>