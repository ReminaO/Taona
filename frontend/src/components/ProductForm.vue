<template>
    <div class="container-fluid">
        <h1 class="text-center">Ajout d'articles</h1>
        <div class="row">
            <div class="col col-xl-10">
            <div class="card formulaire">
                <form @submit="checkForm" class="form-group" action="/products/:id" method="POST" enctype="multipart/form-data">
                    <!-- Ajout des photos -->
                    <input class="image" type="file" multiple ref="prodImg" name="prodImg" @change="fileSelected()">
                    <br><br>
                    <!-- Ajout des informations de l'article -->
                    <input class="form-row__input" type="text" id="name" name="name" :ref="name" v-model="name" placeholder="Nom du produit"> <br><br>
                    <textarea class="form-row__input" type="text" id="description" name="description" :ref="description" v-model="description" placeholder="Description"></textarea><br><br>
                    <input class="form-row__input" type="text" id="price" name="price" :ref="price" v-model="price" placeholder="Prix"> <br><br>
                    <p v-if="errors.length">
                    <b class="text-danger">Merci de corriger l'erreur suivante:</b>
                    <ul>
                        <p class="text-danger text-center" v-for="error in errors" :key='error.index'>{{ error }}</p>
                    </ul>
                    </p>
                    <button @click="addProduct" class="button">
                    Enregistrer
                    </button><br>
                </form><br>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            errors:[],
            name: '',
            price: '',
            description:''
        } 
        },
    methods :{
        checkForm: function (e) {
            if (this.name && this.description && this.price) {
                alert("Article Ajouté !");
                this.$router.go("/articles");
                return true;
            }

            this.errors = [];

            if (!this.name) {
                this.errors.push('Nom obligatoire');
            } 
            if (!this.description) {
                this.errors.push('Description obligatoire');
            } 
            if (!this.price) {
                this.errors.push('Prix obligatoire');
            } 

            e.preventDefault();
            }, 
            // reload: function() {
            // location.reload();
            // }
        
        fileSelected: function () {
            this.img = this.$refs.prodImg.files[0];
            this.thumbImg1 = this.$refs.prodImg.files[1];
            this.thumbImg2 = this.$refs.prodImg.files[2];
            this.thumbImg3 = this.$refs.prodImg.files[3];
            this.thumbVideo = this.$refs.prodImg.files[4];
        },
        addProduct: function () {
            const self = this;
            if (!this.name || !this.description || !this.price){
                return false
            } else {
                let data = {
                    img : this.img,
                    thumbImg1 : this.thumbImg1,
                    thumbImg2 : this.thumbImg2,
                    thumbImg3: this.thumbImg3,
                    thumbVideo : this.thumbVideo,
                    name : this.name,
                    description : this.description,
                    price : this.price,
                }
                this.$store.dispatch('createProduct', data, {
                
            }).then(function () {
                self.$router.push('/articles');
            }, function (error) {
                console.log(error);
            })
      }
    }
    }
}
</script>

<style scoped>
    
    .card {
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
    .form-row__input {
        padding:8px;
        border: rgb(204, 43, 54) solid 1px;
        border-radius: 8px;
        background-color: #d4a449;
        font-weight: 500;
        font-size: 20px;
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
        font-size: 23px;
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
        font-size: 23px;
        border: none;
    }
    .row{
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: center;
    }
</style>