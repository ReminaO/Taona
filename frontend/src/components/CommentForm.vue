<template>
<div class="container w-50">
  <div class="card comment-publish">
    <textarea class="form-row__input form-control" v-bind="$attrs" type="text" id="content" ref="content" name="content" v-model="content" placeholder="Votre avis compte..."></textarea><br>
    <p>maximum 255 caractères</p>
    <button @click="addPost($attrs)" v-bind="$attrs" v-if="$store.state.user.userId !== -1"  ref="content" class="button" data-bs-toggle="button" autocomplete="off">
      Publier
    </button>
    <router-link v-else class="btn button" to="/connexion">Connexion</router-link>
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
      content : '',
    } 
  },
  computed : {
    ...mapState(['status']),
    user(){
      this.$store.state.user
    }
    },       
  methods :{
    addPost: function () {
      let productId = this.$refs.content.id;
      instance.post(`${user.userId}/${productId}`, {
        content: this.content
      })
      .then(response => {
        this.content = response.data.content
        location.reload()
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
  .button{
    background-color: #672932;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
    border: none;
    margin: 1rem 0;
    border-radius: 5px
}
.button:hover {
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
p{
  font-size: 10px;
}
</style>