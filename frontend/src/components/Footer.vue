<template>
<footer class="footer mt-auto py-3 bg-light">
<div class="container">
    <span>
        <div class="py-5 ">
            <div class="row footer-container">
            <div class="col-6">
                <h5>Liens utiles</h5>
                <ul class="nav flex-column">
                <li class="nav-item mb-2"><router-link to="/" class="nav-link p-0 ">Accueil</router-link></li>
                <li class="nav-item mb-2"><router-link to="/about" class="nav-link p-0 ">Qui sommes-nous ?</router-link></li>
                <li class="nav-item mb-2"><router-link to="/contact" class="nav-link p-0 ">Contact</router-link></li>
                <li class="nav-item mb-2"><router-link to="/faqs" class="nav-link p-0 ">FAQs</router-link></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Conditions Générales de ventes</a></li>
                </ul>
            </div>

            <div class="col-4 offset-1">
                <form @submit="checkForm" data-form-type="newsletter">
                <h5>Souscrivez à notre Newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div class="d-flex w-100 gap-2">
                    <label for="newsletter1" class="visually-hidden">Email address</label>
                    <input id="newsletter1" name="email_address" type="text" class="form-control" v-model="email_address" placeholder="Email" data-kwimpalastatus="alive" data-kwimpalaid="1643547080098-0" data-form-type="email">
                    <button class="btn" type="button" data-form-type="action,subscribe" @click="subscribe()" >S'inscrire</button>
                    <p v-if="errors.length">
                        <span>
                            <p class="text-danger" v-for="error in errors" :key='error.index'>{{ error }}</p>
                        </span>
                    </p>
                </div> 
                </form>
            </div>
            </div>

            <div class="d-flex justify-content-between py-4 my-4 border-top">
            <p>© 2022 TaonaCosmetics, Inc. All rights reserved.</p>
            <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-dark" href="#"><i class="bi bi-instagram"></i></a></li>
                <li class="ms-3"><a class="link-dark" href="#"><i class="bi bi-snapchat"></i></a></li>
            </ul>
            </div>
        </div>
    </span>
</div>
</footer>
</template>
<script>

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
    baseURL: 'http://localhost:3000/audience',
    headers: {'Authorization': 'Bearer '+ `${user.token}`}
})
export default {
    name: 'Footer',
    data(){
            return {
                email_address:"",
                errors:[]
            }
        },
    methods: {
        subscribe(){
            const self = this;
            instance.post(`/lists/14fd06490a/members`, {
                email_address: this.email_address,
            })
            .then(function () {
                self.$router.push('/confirmnews');
            }, function (error) {
                console.log(error);
            })
        },
        checkForm(e) {
            const email_regex = /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@((s[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
            const email = this.email_address;
            
            this.errors = [];
            
            if (!email_regex.test(email)) {
                this.errors.push('Merci de saisir le bon format d\'adresse mail !');
            }
        },
    },
}
</script>
<style scoped>
.nav-link, p{
    color: #672932
}
.nav-link:hover {
    color:black
}
.link-dark{
    color: #672932
}
.btn{
    background-color: #d4a449;
    color:white
}
.btn:hover{
    background-color: #672932;
    color:white
}
@media screen and (max-width: 800px){
    .footer-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
