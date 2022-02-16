<template>
    <section class="container product-container mt-100" >
        <div class="product-images" >
            <div class="full-img-container">
                <img id="full" :src="product.img" :alt="product.name" class="figure-img img-fluid rounded ">
            </div>
            <div class="thumbnails-container">
                <div class="thumbnails-container" >
                    <img :src="product.thumbImg1" :alt="product.name" @click="thumbClick()" class="img-thumbnail small img-fluid rounded" style="height:100px; width: 100px" /> 
                    <img :src="product.thumbImg2" :alt="product.name" @click="thumbClick2()" class="img-thumbnail small2 img-fluid rounded" style="height:100px; width: 100px" /> 
                    <img :src="product.thumbImg3" :alt="product.name" @click="thumbClick3()" class="img-thumbnail small3 img-fluid rounded" style="height:100px; width: 100px" /> 
                    <img :src="product.thumbVideo" :alt="product.name" @click="thumbClick4()" class="img-thumbnail small4 img-fluid rounded" style="height:100px; width: 100px" /> 
                </div>
            </div>
        </div>
        <div class="product-infos">
            <h1 class="product-title">{{product.name}}</h1>
            <p class="product-price">{{product.price}}</p>
            <p class="descritpion">{{product.description}}</p>
            <button class="btn btn-add">
                <i class="bi bi-cart4"></i>
                Ajouter au panier
            </button>
        </div>
    </section> 
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name: "Product",
        
        data(){
            return {
                    product: '',
                }
        },
        computed: {
            products(){
                return this.$store.state.products
            }
        },
        methods:{
            ...mapState(["getOneProduct"]),
            thumbClick(){
                const thumbs = document.querySelectorAll('.small')
                const fullImg = document.getElementById('full')
                thumbs.forEach(item =>{
                    let imgSource = item.getAttribute('src')
                    fullImg.setAttribute('src', imgSource)
            })
            },
            thumbClick2(){
                const thumbs2 = document.querySelectorAll('.small2')
                const fullImg = document.getElementById('full')
                thumbs2.forEach(item =>{
                    let imgSource = item.getAttribute('src')
                    fullImg.setAttribute('src', imgSource)
            })
            },
            thumbClick3(){
                const thumbs3 = document.querySelectorAll('.small3')
                const fullImg = document.getElementById('full')
                thumbs3.forEach(item =>{
                    let imgSource = item.getAttribute('src')
                    fullImg.setAttribute('src', imgSource)
            })
            },
            thumbClick4(){
                const thumbs4 = document.querySelectorAll('.small4')
                const fullImg = document.getElementById('full')
                thumbs4.forEach(item =>{
                    let imgSource = item.getAttribute('src')
                    fullImg.setAttribute('src', imgSource)
            })
            },
            
            async initData (){
                const response = await fetch(`http://localhost:3000/api/products/${this.$route.params.id}`)   
                this.product = await response.json()
            }
        },
        async created() {
            this.initData()
        },
        
}
</script>
<style scoped>

.product-container {
    width:80%;
    background-color: white;
    color: #672932;
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
    
}
.product-images{
    flex: 1;
    background-color: #672932;
    border-radius: 10px 0 0 10px;
}
.product-infos{
    flex: 1;
    padding: 2rem;
    background-color:#d4a449 ;
    border-radius:  0 10px 10px 0;
}
.full-img-container{
    display: flex;
    justify-content: center;
    height: 350px;
    overflow:hidden
}
#full{
    max-width:100%
}
.thumbnails-container{
    display:flex;
    justify-content: center;
}
.small, .small2, .small3, .small4 {
    flex:1;
    margin: 0.3rem;
}
h1.product-title{
    font-size: 3rem;
}
p.product-price{
    font-size: 1rem;
    margin: 2rem 0;
}
p.description{
    font-size: 2rem;
}
button.btn-add{
    background-color: black;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
    border: none;
    margin: 1rem 0;
}
img{
    object-fit: fill;
    background-color: #672932;
    border:#d4a449 1px solid;
    margin-top: 10px
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