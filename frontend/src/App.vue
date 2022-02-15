<template>
  <body>
    <Nav/>
    <router-view/>
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
