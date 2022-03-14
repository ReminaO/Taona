<template>
<div class="container w-50">
  <div class="card comment-publish">
    <input class="form-row__input form-control" type="text" id="comment" ref="comment" name="comment" v-model="comment" placeholder="Votre Commentaire..."><br>
    <button @click="addPost()" v-if="$store.state.user.userId !== -1"  ref="comment" class="button" data-bs-toggle="button" autocomplete="off">
      Publier
    </button>
    <button v-else>
      <router-link class="btn btn-publish" to="/connexion">Connexion</router-link>
    </button>
  </div><br>
</div>
</template>

<script>
import { mapState } from 'vuex';
const axios = require('axios');

let user = localStorage.getItem('user');

if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    //instance.defaults.headers.common = {'Authorization': `bearer ${user.token}`};
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/comments/',
  headers: {'Authorization': 'Bearer '+ `${user.token}`}
});

export default {
  name: 'CommentForm',
  data () {
    return{
      comment : '',
    } 
  },
  computed : {
    ...mapState(['status']),
    user(){
      this.$store.state.user
    }
    },     
  
  mounted: function () {
    this.$store.dispatch('getAllComments');
  },
  
  methods :{
    
    addPost: function () {
      instance.post(`${user.userId}`, {
        comment: this.comment
      })
      .then(response => {
        this.comment = response.data.comment
        this.$router.go("/wall");
      });
    },
  },
}
</script>

<style scoped>
.form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:rgb(242, 242, 242);
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .card {
    background-color: #ffffff;
    border: none;
  }
  button{
    background-color: #672932;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
    border: none;
    margin: 1rem 0;
    border-radius: 10px
}
button:hover {
  background-color:#b46773;
  color:rgba(255,255,255,1);
}
.form-row__input {
    width: min(max(100%), 100%);
}
.comment-publish {
  border: solid 1px #672932;
  border-radius : 10px;
  padding: 10px
}
</style>