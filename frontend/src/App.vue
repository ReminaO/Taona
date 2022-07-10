<template>
  <body>
    <Nav/>
    <router-view :key='$route.path'/>
    <Footer/>
  </body>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

body, html{
  margin:0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;/* soit 10px*/
}
img{
  border-radius: 4px
}
.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
    justify-content: left;
  }
  .form-row__input {
    margin-top:20px;
    padding:8px;
    border: #672932 solid 1px;
    border-radius: 8px;
    background-color: white;
    font-weight: 500;
    font-size: 20px;
    flex:1;
    max-width: 50%;
    color: #672932;
    outline:rgb(255, 101, 70);
    display: flex;
    justify-content: left;
  }
  .form-row__input::placeholder {
    color:#672932;
    
  }
</style>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>
