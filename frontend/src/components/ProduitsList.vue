<template>
  <section class="container d-flex ">
    <div class="container d-flex flex-column">
      <div class="d-flex justify-content-center row">
        <Product v-for="product in products" :key="product.id" class="card col-3" style="width: 20rem;"
        :img="product.img"
        :name="product.name"
        :price="product.price"
        :id="product.id"
        />
      </div>
    </div>
    
  </section> 
</template>

<script>
import Product from '@/components/Product'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Product
  },
  data(){
    return {
    }
  },
  computed: {
      products() {
          return this.$store.state.products
      },    
  },
  mounted: function () {
    const self =  this;
    self.$store.dispatch('getProducts');
  },
  methods:{
    ...mapState(["getOneProduct"]),
  }

}
</script>
<style scoped>
.card{
  margin: 30px;
  position: relative
}

 .card-body{
   display: flex;
   justify-content: space-between;
 }


 
</style>