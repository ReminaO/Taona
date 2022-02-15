<template>
    <section class="container product-container mt-100">
        <div class="product-images">
            <div class="full-img-container">
                <img id="full" src="../assets/img/logo.png" alt="Produits" class="figure-img img-fluid rounded ">
            </div>
            <div class="thumbnails-container">
                <div v-for="(img, index) in images" :key="index" class="thumbnails-container" >
                    <img :src="img.lien" :alt="img.nom" @click="thumbClick()" class="img-thumbnail small img-fluid rounded" style="height:100px; width: 100px" /> 
                </div>
            </div>
        </div>
        <div class="product-infos">
            <h1 class="product-title">TaonaBox</h1>
            <p class="product-price">56€</p>
            <p class="descritpion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sit inventore dolores illo facilis exercitationem facere, maiores repellat debitis minus accusamus saepe eaque. Rerum assumenda ab doloribus eius vero soluta!</p>
            <button class="btn btn-add">
                <i class="bi bi-cart4"></i>
                Ajouter au panier
            </button>
        </div>
    </section> 
</template>

<script>
    export default {
        name: "Product",
        data(){
            return {
                images : [
                    {lien :"../assets/img/logo.png", nom: "Produit 1"}, 
                    {lien :"../assets/img/Logo2.jpg", nom: "Produit 2"}, 
                    {lien :"../assets/img/Logo3.png", nom: "Produit 3"}, 
                    {lien :"../assets/img/logo.png", nom: "Produit 4"} 
            ]}
        },
        methods:{
            thumbClick(){
                const thumbs = document.querySelectorAll('.small')
                const fullImg = document.getElementById('full')
                thumbs.forEach(item =>{
                    let imgSource = item.getAttribute('src')
                    fullImg.setAttribute('src', imgSource)
                })
                
            }
        },
}
</script>
<style scoped>

.product-container {
    width:80%;
    background-color: white;
    color: grey;
    display: flex;
}
.product-images{
    flex: 1;
}
.product-infos{
    flex: 1;
    padding: 2rem;
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
.small{
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
    object-fit: contain;
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