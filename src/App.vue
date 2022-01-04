<template>
  <body>
    <Nav/>
    <router-view/>
    <Footer/>
  </body>
</template>

<style>
body, html{
  margin:0;
  padding: 0;
  background-color: bisque;
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
