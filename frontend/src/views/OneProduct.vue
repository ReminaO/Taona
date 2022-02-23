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
            <p class="product-price">{{product.price}}€</p>
            <p class="descritpion">{{product.description}}</p>
            <button class="btn btn-add">
                <i class="bi bi-cart4"></i>
                Ajouter au panier
            </button>
        </div>
        <div v-if="$store.state.user.isAdmin == true" class="card-footer">
            <i class="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#updateModal"></i><br>
            <i @click="deleteProduct()" class="bi bi-trash3"></i>
        </div>
        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="form-group" action="/products/:userId/:id" method="PUT" enctype="multipart/form-data">
                        <!-- Ajout des photos -->
                        <input class="image" type="file" multiple ref="prodImg" name="prodImg" @change="fileSelected()">
                        <br><br>
                        <!-- Ajout des informations de l'article -->
                        <input class="form-row__input" type="text" id="name" name="name" v-model="name" placeholder="Nom du produit"> <br><br>
                        <textarea class="form-row__input" type="text" id="description" name="description" v-model="description" placeholder="Description"></textarea><br><br>
                        <input class="form-row__input" type="text" id="price" name="price" v-model="price" placeholder="Prix"> <br><br>
                    
                        <div class="modal-footer">
                            <button type="button" class="btn" data-bs-dismiss="modal">Annuler</button>
                            <button @click="modifyProduct()" type="button" class="btn">Modifier</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </section> 
</template>

<script>
import { mapState } from 'vuex'

const axios = require('axios')

let user = localStorage.getItem('user')
if (!user) {
    user = {
    userId: -1,
    token: '',
    }
} else {
    try {
    user = JSON.parse(user)
    } catch (ex) {
    user = {
        userId: -1,
        token: '',
        }
    }
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {'Authorization': 'Bearer '+ `${user.token}`}
})

    export default {
        name: "Product",
        
        data(){
            return {
                product: '',
                name:'',
                description:'',
                price:''
            }
        },
        computed: {
            products(){
                return this.$store.state.products
            }
        },
        methods:{
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
            },
        
            
            deleteProduct: function () {
                const self = this;
                instance.delete(`products/${user.userId}/${this.$route.params.id}`, {
                })
                .then(function () {
                alert("Article supprimé !");
                self.$router.push('/articles')
                }, function (error) {
                console.log(error);
                })
            },
            fileSelected: function () {
            this.img = this.$refs.prodImg.files[0];
            this.thumbImg1 = this.$refs.prodImg.files[1];
            this.thumbImg2 = this.$refs.prodImg.files[2];
            this.thumbImg3 = this.$refs.prodImg.files[3];
            this.thumbVideo = this.$refs.prodImg.files[4];
        },
            modifyProduct: function () {
                const formData = new FormData();
                formData.append('prodImg', this.img);
                formData.append('prodImg', this.thumbImg1);
                formData.append('prodImg', this.thumbImg2);
                formData.append('prodImg', this.thumbImg3);
                formData.append('prodImg', this.thumbVideo);
                formData.append('description', this.description);
                formData.append('price', this.price);
                formData.append('name', this.name);
                const self = this;
                instance.put(`products/${user.userId}/${this.$route.params.id}`, formData, {
                })
                .then(function () {
                alert("Article modifié !");
                self.$router.push(`/articles`)
                }, function (error) {
                console.log(error);
                })
            },
            
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
    background-color:#F7F7F7 ;
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
    cursor: pointer;
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
.modal{
    backdrop-filter: blur(10px);
}
.modal-body{
    background: #672932;
    color: #d4a449;
    border: 1px solid #d4a449;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 100px;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.modal-content{
    background-color:#d4a449
}
i{
    cursor: pointer;
}
.form-row__input {
    padding:8px;
    border: rgb(204, 43, 54) solid 1px;
    border-radius: 8px;
    background-color: #d4a449;
    font-weight: 500;
    font-size: 17px;
    flex:1;
    min-width: 100px;
    color: white;
}
.form-row__input::placeholder {
    color:#672932;
    
}
.form-row__input {
    outline:rgb(255, 101, 70);
    
}
button {
    background-color:#d4a449;
    color:rgba(255,255,255,1);
    border-radius: 8px;
    padding: 10px 25px;
    font-size: 20px;
    border: none;
}
button:hover {
    background-color:#b46773;
    color:rgba(255,255,255,1);
}
textarea, input {
    width: 100%
}
.image {
    background-color:#d4a449;
    color:rgba(255,255,255,1);
    border-radius: 8px;
    padding: 10px 25px;
    font-size: 17px;
    border: none;
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