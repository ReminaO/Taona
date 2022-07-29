<template>
    <main>
        <div class="p-5 mb-4 banner jumbotron">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Information de Livraison</h1>
                <!-- <p class="col-md-8 fs-4">Sublimez vos cheveux et ceux de vos proches, grâce à la Taona Box. Pas moins de 8 accessoires pour prendre soin de votre chevelure !</p> -->
            </div>
        </div>
        <div class="information-container">
            <section class="container-fluid">
                <div class="delivery-choice">
                    <p>Merci de sélectionner un mode de livraison</p>
                    <div>
                        <input type="checkbox" id="mondialRelay" value="mondialRelay" v-model="mondialRelay">
                        <label for="mondialRelay">Mondial Relay</label>
                        <MondialRelay v-if="mondialRelay"/>
                    </div>
                    <div>
                        <input type="checkbox" id="colissimo" value="colissimo" v-model="colissimo">
                        <label for="colissimo">Colissimo</label>
                        <div v-if="colissimo">Colissimo</div>
                    </div>
                    <div v-if="$store.state.user.userId == -1">
                        <input type="checkbox" id="connexion" value="connexion" v-model="connexion">
                        <label for="connexion">Se connecter</label><br>
                        <div class="connexion-container">
                            <router-link to="/connexion"><button  class="btn check-btn" v-if="connexion">Connexion</button></router-link>
                        </div>
                    </div>
                </div>
                <div v-if="$store.state.user.userId == 1">
                    <form @submit="checkForm">
                        <div class="form-row">
                            <input v-model="$store.state.user.email" ref="email_address" @change="isEmailValid" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <input v-model="$store.state.user.firstName" ref="firstName" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <input v-model="$store.state.user.lastName" ref="lastName" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <input v-model="$store.state.user.phone_number" ref="phone_number" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <textarea v-model="$store.state.user.address" ref="address" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <input v-model="$store.state.user.postal_code" ref="postal_code" class="form-row__input" type="text" />
                        </div>
                        <div class="form-row">
                            <input v-model="$store.state.user.city" ref="city" class="form-row__input" type="text" />
                        </div>
                        <input type="checkbox" v-model="newsletter" value="newsletter" id="newsletter"/>
                        <label for="newsletter"> "Je souhaite recevoir la newsletter et les offres de TAONA Cosmetics"</label><br><br>
                        <button class="btn check-btn" @click="order()"><router-link to="">Confirmer la commande</router-link></button>
                    </form>
                </div>
            </section>
            <aside class="resume-container">
                <h3>Récapitulatif de commande</h3>
                <div v-for="cart in carts" :key="cart.id" class="cart-container">
                    <div class= "product">
                        <img :src="cart.img" :alt="cart.name">
                        <span> {{cart.name}}</span>
                    </div>
                    
                    <div class="quantity">
                        <span class="quantity-span">{{cart.quantity}}</span>
                    </div>
                    <div class="price">{{cart.price / 100}} €</div>

                </div>
                <div class="promotion-container" >
                    <h4 class="basketTotalTitle">Promotion</h4>
                    <h4 class="basketTotal"> <span class="equal">=</span> {{total/100 * sale}}€</h4>
                </div>
                <div class="deliveryContainer">
                    <h4 class="basketTotalTitle">Frais de Livraison</h4>
                    <h4 class="basketTotal" v-if="total > 2500"> <span class="equal">=</span> Gratuit</h4>
                    <h4 class="basketTotal" v-else> <span class="equal">=</span> 4.55€</h4>
                </div>
                <div class="basketTotalContainer ">
                    <h4 class="basketTotalTitle ">Total</h4>
                    <h4 class="basketTotal"> <span class="equal">=</span> {{promotion/100}}€</h4>
                </div> 
            </aside>
        </div>
    </main>  
</template>

<script>
import MondialRelay from '@/components/MondialRelay'


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
    baseURL: 'http://localhost:3000/',
    headers: {'Authorization': 'Bearer '+ `${user.token}`}
})

export default {
    components:{
        MondialRelay
    },
    data: function () {
    return {
        mode: 'login',
        id: '',
        email_address: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postal_code: '',
        phone_number: '',
        errors: [],
        newsletter:false,
        mondialRelay:false,
        colissimo:false, 
        connexion:false,
        }
    },
    mounted(){
        localStorage.setItem("totalCart", JSON.stringify(this.promotion));
    },
    computed:{
        carts() {
            return this.$store.state.cart
        },
        sale(){
            let sale = localStorage.getItem('sale')
            return sale
        },
        total() {
            let price = 0;
            this.$store.state.cart.map(item => {
                price += item["quantity"] * item["price"]
            })
            return price
        },
        promotion(){
            if (this.sale && this.total < 2500) {
                return this.total - (this.total * this.sale) + 455
            }
            else if(this.sale && this.total > 2500){
                return this.total - (this.total * this.sale)
            } 
            else if(this.total > 2500 && !this.sale){
                return this.total 
            }
            else if(!this.sale && this.total < 2500){
                return this.total + 455
            }
        }
    },
    methods: {
        checkForm: function (e) {
            const email_regex = /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@((s[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
            const email = this.email_address;
            
            this.errors = [];
            
            if (!email_regex.test(email)) {
                this.errors.push('Merci de saisir le bon format d\'adresse mail !');
            } else if(!this.$refs.email_address.value || 
            !this.$refs.firstName.value || 
            !this.$refs.lastName.value || 
            !this.$refs.phone_number.value || 
            !this.$refs.address.value || 
            !this.$refs.city.value || 
            !this.$refs.postal_code.value){
                this.errors.push('Merci de compléter tous les champs');
            }
            e.preventDefault();
        },
        order(){
            const self = this;
            if(this.newsletter){
                instance.post(`audience/lists/14fd06490a/members`, {
                email_address: this.$refs.email_address.value,
                })
            }
            const contact = {
                firstName: self.$refs.firstName.value,
                lastName: self.$refs.lastName.value,
                email: self.$refs.email_address.value,
                address: self.$refs.address.value,
                city: self.$refs.city.value,
                postal_code: self.$refs.postal_code.value,
                phone_number: self.$refs.phone_number.value,
            }
            const products = [];
            const cart = self.carts;
            for (const product of cart) {
                for (let i = 0; i < product.quantity; i++) {
                products.push(product.id);
                }
            }
            const data = {
                "contact" : contact,
                "products" : products
            }
            console.log("data : ", data);

            this.$store.dispatch('order', data)
        },
    },
}
</script>

<style scoped>
.equal {
    font-size:15px;
    margin: 10px;
    margin-top:5px;
}
.delivery-choice{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-top: 50px
}
.delivery-choice label, .delivery-choice p {
    font-size: 20px;
    margin: 10px;
    color:#672932

}
 h3, label{
    color:#672932
}
a {
  text-decoration: none;
  color: white
}
a:hover {
  text-decoration: none;
  color: white
}
.promotion-container{
        display:flex;
        justify-content: flex-end;
        width: 100%;
        padding: 10px 0;
    }
.deliveryContainer{
    display:flex;
    justify-content: flex-end;
    width: 80%;
    padding: 10px 0;
}
.information-container{
    display: flex;
    justify-content: space-between;
}
.container-fluid{
    width:95%
}
.form-container{
    margin: 50px;
    width:100%

}
.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
    justify-content: left;
  }
  .form-row__input {
    margin-top:20px;
    padding:8px;
    border: #672932 solid 1px;
    border-radius: 8px;
    background-color: white;
    font-weight: 500;
    font-size: 20px;
    flex:1;
    max-width: 50%;
    color: #672932;
    outline:rgb(255, 101, 70);
    display: flex;
    justify-content: left;
  }
  .form-row__input::placeholder {
    color:#672932;
    
  }
.check-btn {
    /* position: relative;
    left: 75%;
    width: 25%; */
    background-color:#d4a449;
    color:rgba(255,255,255,1);
    border-radius: 8px;
    padding: 10px 25px;
    font-size: 23px;
    border: none;
}
.check-btn:hover{
    background-color: #672932;
    color: white
}    
.product-header {
    max-width: 100%;
    display: flex;
    justify-content: center;
    /* margin: 0 auto; */
    border-bottom: #672932 4px solid;
}
.cart-container {
    width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: #672932 2px solid;
}
.resume-container {
    width: 60%;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-right: 50px;
    border:#672932 solid 1px;
    min-height:900px;
    border-radius:10px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.resume-container h3{
    margin-top:50px;
}
    .product-title {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .product img {
        display: flex;
        width: 30%;
        height: 70px;
        object-fit: contain;
        margin-left: 30px;
        margin-right: 30px
    }
    .price {
        width : 20%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .total {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .quantity {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .basketTotalContainer{
        display:flex;
        justify-content: center;
        align-items: center;
        width:70%;
        padding: 10px 0;
        border-top:#672932 solid 3px
        
    }

    .basketTotalTitle{
        display:flex;
        justify-content: center;
        width: 100%;
        font-size:20px
    }

    .basketTotal {
        width : 100%;
        display:flex;
        font-size:20px

        /* justify-content: center; */
    }

    .product {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 0;
        
    }
.quantity-span{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 5px;
    border-radius: 5px
}
@media screen and (max-width: 500px)
{
.information-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
}
</style>