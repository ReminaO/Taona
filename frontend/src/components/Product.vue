<template>
    <section class="container d-flex ">
    <div class="container d-flex flex-column">
        <div class="d-flex justify-content-center row">
            <a :href="`/article/${id}`">
            <img :src="img" class="card-img-top" :alt="name" />
            <div class="card-body">
                <p class="card-text">{{name}}</p>
                <p class="card-text">{{price}}</p>
            </div>
            <div v-if="$store.state.user.isAdmin == true" class="card-footer">
            <i class="bi bi-pencil-square"></i>
            <i class="bi bi-trash3"></i>
            </div>
            </a>
        </div>
    </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name: "Product",
        
        data(){
            return {
                }
        },
        computed: {
            product(){
                return this.$store.state.products
            },
        },
        methods:{
            ...mapState(["getOneProduct"]),
            },
        props: ["name", "img", "price", "id"],
    }
</script>
<style scoped>

    .card-body{
    display: flex;
    justify-content: space-between;
    }
    img{
        object-fit: fill;
        margin-top: 10px;
        height: 350px;
        width: 100%
    }
    .card{
        background-color: #d4a449;
        border:#672932 1px solid;
        margin: 30px;
        position: relative
    }
    a {
        text-decoration: none;
        color:#672932
    }
    a:hover{
        color:#333333
    }
    .card-footer{
        display: flex;
        justify-content: space-between;
    }
@media screen and (max-width: 800px){
    .container{
        height: auto;
    }
    .product-container{
        flex-direction: column;
    }
    .full-img-container{
        height: auto;/*annule la height:350pixels*/
    }
    .thumbnails-container{
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
    .small{
        width: 50%;
    }
}
</style>