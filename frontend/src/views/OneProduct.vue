<template>
    <div>
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
                <div v-if="$store.state.user.userId !== -1">
                    <div @click="like" class="btn like-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill btn-like" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </div>
                    <span class="nb-likes align-baseline align-middle ms-1">{{ product.likes }}</span>
                    <div @click="dislike" class="btn dislike-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill btn-dislike" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                        </svg>
                    </div>
                </div>
                <p class="product-price">{{product.price / 100}}€</p>
                <p class="descritpion">{{product.description}}</p><br>
                <div v-if="$store.state.user.userId !== -1">
                    <button  @click.prevent="addToCart(product)" class="btn btn-add">
                        <i class="bi bi-cart4"></i>
                        Ajouter au panier
                    </button>
                </div>
                <router-link v-else @click="addToCart(product)" class="btn nav-link" to="/connexion">Connexion</router-link>
            </div>
            <div v-if="$store.state.user.isAdmin == true" class="card-footer">
                <i class="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#updateModal"></i><br>
                <i @click="deleteProduct()" class="bi bi-trash3"></i>
            </div>
            <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modification</h5>
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
        <section class="container comment-container">
            <h4>Avis</h4><br><br>
            <CommentForm v-bind="product"/>
            <div v-if="comment.length > 0">
                <div 
                    v-for="(comment) in comment.filter((comment) => { 
                    return comment.productId == $store.state.products.id 
                    })" 
                    :key="comment.id"
                    class=" comment-content">
                    <div class="comment-display">
                        <div class="comment-display__content">
                            <p class="comment-display__username"> {{ comment.username }} </p>
                            <p class="comment-display__comment"> "{{ comment.content }}" </p>
                        </div>
                    </div>
                    <div>
                    <button v-if="this.$store.state.user.userId == comment.userId || this.$store.state.user.isAdmin == 1" name="delete" class="button deleteBtn" data-bs-toggle="button" autocomplete="off" @click="deleteComment(comment.id)">
                    <i class="bi bi-trash3"></i>
                    </button>
                    </div> 
                </div>
            </div>
            
        </section>    
    </div>
</template>

<script>
import CommentForm from '@/components/CommentForm'

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
        name: "OneProduct",
        components: {
            CommentForm
        },
        data(){
            return {
                // product: '',
                name:'',
                description:'',
                price:'',
                quantity: '',
                cart: [],
                UserId: '' ,
                ProductId: '',
                likes:[],
            }
        },
        created() {
            if( window.localStorage ){
                if( !localStorage.getItem('firstLoad') ){
                localStorage['firstLoad'] = true;
                window.location.reload();
                } else
                localStorage.removeItem('firstLoad');
            }
        },
        mounted(){
            const self = this;
            self.$store.dispatch( 'getOneProduct', this.$route.params.id)
            self.$store.dispatch( 'getAllComments' );
        },
        computed: {
            product(){
                return this.$store.state.products
            },
            productInfos() {
                return this.$store.state.productInfos
            },
            comment(){
                return this.$store.state.comments
            },
            user(){
                return this.$store.state.userInfos
            },
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
            addToCart: function(product){
                this.$store.dispatch('addItem', product)
                // self.$router.push(`/panier`);
            },
            deleteProduct: function () {
                const self = this;
                    this.$store.dispatch('deleteProduct', this.$route.params.id, {
                })
                .then(function () {
                alert("Article supprimé !");
                this. $router.go()
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
                const self = this;
                const formData = new FormData();
                formData.append('prodImg', this.img);
                formData.append('prodImg', this.thumbImg1);
                formData.append('prodImg', this.thumbImg2);
                formData.append('prodImg', this.thumbImg3);
                formData.append('prodImg', this.thumbVideo);
                formData.append('description', this.description);
                formData.append('price', this.price);
                formData.append('name', this.name);
                instance.put(`products/${user.userId}/${this.$route.params.id}`, formData, {
                })
                .then(function () {
                alert("Article modifié !");
                this. $router.go()
                }, function (error) {
                console.log(error);
                })
            },
            deleteComment: function (id) {
                const self = this;
                    this.$store.dispatch('deleteComment', id, {
                })
                .then(function () {
                alert("Commentaire supprimé !");
                this. $router.go()
                }, function (error) {
                console.log(error);
                })
            },
            like() {
                this.$store.dispatch( 'productLike', this.$route.params.id)
                this. $router.go()
            },
            dislike() {
                this.$store.dispatch( 'productDislike', this.$route.params.id)
                this. $router.go()
            },
},
        
}  
</script>
<style scoped>

.product-container {
    width:80%;
    /* background-color: white; */
    color: #672932;
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
    
}
.product-images{
    flex: 1;
    background-color: #672932;
    border-radius: 10px 0 0 10px;
    -webkit-box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
    box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
}
.product-infos{
    flex: 1;
    padding: 2rem;
    background-color:#F7F7F7 ;
    border-radius:  0 10px 10px 0;
    -webkit-box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
    box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
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
.btn-add, .nav-link{
    background-color: #672932;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
    border: none;
    margin: 1rem 0;
}
.nav-link:hover, .btn-add:hover {
    background-color: #b46773;
    color:rgba(255,255,255,1);
}

.img-fluid{
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
    padding: 10px 15px;
    margin: 5px;
    font-size: 20px;
    border: none;
}
button:hover {
    background-color: #672932;
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
.btn-like {
    fill: green;
    transform: scale(1);
    transition: all 0.15s ease-in-out;
}
.btn-like:hover {
    fill: lighten(green, 10%);
    transform: scale(1.1);
}
.btn-dislike {
    fill: red;
    transform: scale(1);
    transition: all 0.15s ease-in-out;
}
.btn-dislike:hover {
    fill: lighten(red, 10%);
    transform: scale(1.1);
}
.comment-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border:#672932 solid 1px;
    margin-bottom: 50px;
    position: relative;
    left: 25%;
    border-radius: 10px;
    width:50%;
    -webkit-box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
    box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
}
.comment-display {
    display: flex;
    
}

.comment-display__username {
    float:left;
    margin: 30px;
    text-decoration: underline #672932;
    -moz-text-decoration-style: wavy;
    text-decoration-style: wavy
}
.comment-display__comment {
    display: flex;
    margin: 30px;
}
.comment-container{
    display: flex;
    flex-direction: column;
    position: relative
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