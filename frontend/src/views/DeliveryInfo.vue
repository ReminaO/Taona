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
                <div class="connexion-container">
                    <router-link to="/connexion"><button v-if="$store.state.user.userId == -1" class="btn check-btn">Connexion</button></router-link>
                </div>
                <div class="form-container">
                    <div v-if="$store.state.user.userId == -1">
                        <h3>Ou Commander en tant qu'invité</h3>
                        <form @submit="checkForm">
                            <div class="form-row">
                                <input v-model="email" @change="isEmailValid" class="form-row__input" type="text" placeholder="Adresse mail" required/>
                            </div>
                            <div class="form-row">
                                <input v-model="firstName" class="form-row__input" type="text" placeholder="Prénom" required/>
                            </div>
                            <div class="form-row">
                                <input v-model="lastName" class="form-row__input" type="text" placeholder="Nom" required/>
                            </div>
                            <div class="form-row">
                                <input v-model="phone_number" class="form-row__input" type="text" placeholder="Téléphone" required/>
                            </div>
                            <div class="form-row">
                                <textarea v-model="address" class="form-row__input" type="text" placeholder="Adresse" required/>
                            </div>
                            <div class="form-row">
                                <input v-model="postal_code" class="form-row__input" type="text" placeholder="Code postal" required/>
                            </div>
                            <div class="form-row">
                                <input v-model="city" class="form-row__input" type="text" placeholder="Ville" required/>
                            </div>
                            
                            <router-link to="/connexion"><button class="btn check-btn">Commander</button></router-link>
                        </form>
                    </div>
                    <div v-else-if="$store.state.user.userId == 1">
                        <h3></h3>
                        <form @submit="checkForm">
                            <div class="form-row">
                                <input v-model="$store.state.user.email" @change="isEmailValid" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <input v-model="$store.state.user.firstName" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <input v-model="$store.state.user.lastName" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <input v-model="$store.state.user.phone_number" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <textarea v-model="$store.state.user.address" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <input v-model="$store.state.user.postal_code" class="form-row__input" type="text" />
                            </div>
                            <div class="form-row">
                                <input v-model="$store.state.user.city" class="form-row__input" type="text" />
                            </div>
                            
                            <router-link to="/connexion"><button class="btn check-btn">Commander</button></router-link>
                        </form>
                    </div>
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
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">Total</h4>
                    <h4 class="basketTotal"> = {{total / 100}}€</h4>
                </div>
            </aside>
        </div>
    </main>  
</template>

<script>
export default {
    data: function () {
    return {
        mode: 'login',
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postal_code: '',
        phone_number: '',
        password:'',
        errors: []
        }
    },
    computed:{
        carts() {
            return this.$store.state.cart
        },
        total() {
            let price = 0;
            this.$store.state.cart.map(item => {
                price += item["quantity"] * item["price"]
            })
            return price
        }
    },
    methods: {
        checkForm: function (e) {
            const email_regex = /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@((s[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
            const email = this.email;
            const pwd_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const password = this.password;
            
            this.errors = [];
            
            if (!email_regex.test(email)) {
                this.errors.push('Merci de saisir le bon format d\'adresse mail !');
            } else if (!pwd_regex.test(password)) {
                this.errors.push('Le mot de passe doit comporter un minimum de 8 caractères, au moins un chiffre et au moins une lettre ');
            } else {
                this.errors.push('Adresse mail déjà utilisée !');
            }
            e.preventDefault();
        },
    },
}
</script>

<style scoped>
.banner{
    background-color: #672932;
    color: #d4a449;
    -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
    box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
}
h3{
    color:#672932
}
.connexion-container{
    margin: 50px;
}
.information-container{
    display: flex;
    justify-content: space-between;
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
    margin-bottom: 50px;
    margin-top: 50px;
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
        width: 100%;
        padding: 10px 0;
    }

    .basketTotalTitle{
        display:flex;
        justify-content: center;
        width: 100%;
    }

    .basketTotal {
        width : 100%;
        display:flex;
        justify-content: center;
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
</style>