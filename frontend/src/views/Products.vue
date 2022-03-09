<template>
  <Produits />
</template>

<script>
// @ is an alias to /src
import Produits from'@/components/ProduitsList'
export default {
  name: 'Products',
  components: {
    Produits
  }
}
</script>
<style scoped>
.card{
  margin: 30px
}
</style>