<template>
  <div class="container-fluid">
    <div class='logo'>
      <img src="../assets/img/Logo3.png" alt="logo-Taona">
    </div>
    <form @submit="checkForm" class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
      <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
      <div class="form-row">
        <input v-model="email" @change="isEmailValid" class="form-row__input" type="text" placeholder="Adresse mail*"/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="firstName" class="form-row__input" type="text" placeholder="Prénom*"/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="lastName" class="form-row__input" type="text" placeholder="Nom*"/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="phone_number" class="form-row__input" type="text" placeholder="Téléphone*"/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <textarea v-model="address" class="form-row__input" type="text" placeholder="Adresse*"/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="postal_code" class="form-row__input" type="text" placeholder="Code postal*"/>
      </div> 
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="city" class="form-row__input" type="text" placeholder="Ville*"/>
      </div>
      <div class="form-row">
        <input v-model="password" @change="isPwdValid" class="form-row__input" id="password" type="password" ref="password" placeholder="Mot de passe*" @keyup='check()'/>
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input type="password" name="confirm_password" class="form-row__input" id="confirm_password" ref="confirm_password"  placeholder="Confirmer le mot de passe*" @keyup='check();' />
        <br><span id='message'></span>
      </div>
      <div class="form-row text-danger" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
      <div class="form-row text-danger"  v-if="mode == 'create' && status == 'error_create'">
        <p v-if="errors.length">
          <span>
            <p class="text-danger" v-for="error in errors" :key='error.index'>{{ error }}</p>
          </span>
        </p>
      </div>
      <div class="checkbox" v-if="mode == 'create'">
        <input type="checkbox" v-model="newsletter" value="newsletter" id="newsletter"/>
        <label for="newsletter"> "Je souhaite recevoir la newsletter et les offres de TAONA Cosmetics"</label><br><br>
      </div>                                    
      <div class="form-row">
        <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button @click="signup()" class="button"  :class="{'button--disabled' : !validatedFields}" v-else>
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const axios = require('axios')


let user = localStorage.getItem('user')
if (!user) {
  user = {
    userId: -1,
    token: '',
  }
} else {
  try {
    user = JSON.parse(user)
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    }
  }
}
const instance = axios.create({
  baseURL: 'http://localhost:4242/',
  headers: {'Authorization': 'Bearer '+ `${user.token}`}
})
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postal_code: '',
      phone_number: '',
      password:'',
      errors: [],
      newsletter:false,

    }
  },
  created() {
    if( window.localStorage ){
        if( !localStorage.getItem('firstLoad') ){
        localStorage['firstLoad'] = true;
        window.location.reload();
        } else
        localStorage.removeItem('firstLoad');
    }
},
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.go('/');
      return ;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.lastName != "" && this.firstName != "" && this.phone_number != "" && this.password != "" && this.city != "" && this.postal_code != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/panier');
      }, function (error) {
        console.log(error);
      })
    },
    signup: function () {
      const self = this;
      if(this.newsletter){
        instance.post(`audience/lists/14fd06490a/members`, {
        email_address: this.email,
        })
      }
      if(this.$refs.password.value === this.$refs.confirm_password.value) {
        this.$store.dispatch('createAccount', {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          city: this.city,
          postal_code: this.postal_code,
          phone_number: this.phone_number,
          password: this.password,
        }).then(function () {
          self.login();
          self.$router.push('/')
        }, function (error) {
          console.log(error);
        })
      }
    },
    checkForm: function (e) {
      const email_regex = /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@((s[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
      const email = this.email;
      const pwd_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const password = this.password;
      
      this.errors = [];
    
      if (!email_regex.test(email)) {
        this.errors.push('Merci de saisir le bon format d\'adresse mail !');
    } else if (!pwd_regex.test(password)) {
        this.errors.push('Le mot de passe doit comporter un minimum de 8 caractères, au moins un chiffre et au moins une lettre ');
    } else {
        this.errors.push('Adresse mail déjà utilisée !');
      }
      e.preventDefault();
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
  }
}
</script>

<style scoped>
  .card {
    text-align: center;
    width: 50%;
    background: white;
    color: #d4a449;
    background-position: 50% 50%;
    border: 1px solid #672932;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 100px;
  }
  .logo img{
    height: 300px;
    object-fit: contain;
  }
  .container-fluid {
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin: 0;
    padding: 0;
  }
  .form-row__input {
    max-width: 100%;
  }
  button {
    background-color:#d4a449;
    color:rgba(255,255,255,1);
    border-radius: 8px;
    padding: 10px 25px;
    font-size: 23px;
    border: none;
    }
  button:hover {
    background-color:#672932;
    color:rgba(255,255,255,1);
}
.button--disabled {
  background-color:rgba(253, 45, 1, 0.2);
  color:rgba(255,255,255,0.8);
}
.card__action {
  color: rgb(167, 39, 14);
  cursor: pointer;
}
.card__action:hover {
  color: rgb(253, 45, 1);
  text-decoration: underline;

}
.card__subtitle {
  font-size: 23px;
}
.checkbox{
  display: flex;
  align-items: center;
  color:#672932
}
</style>