<template>
  <body>
    <Nav/>
    <router-view/>
    <Footer/>
  </body>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap');
body, html{
  margin:0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
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
