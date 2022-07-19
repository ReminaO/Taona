<template>
    <div class="container">
        <!-- DIV cookies -->
        <div class="cookies">
            <div class="cookies-texte">
                <p>En poursuivant, vous acceptez l'utilisation des cookies par le site afin de vous proposer des contenus adaptés et réaliser des statistiques.
                </p>
            </div>
            <div class="cookies-btn">
                <button @click="cookieBtn()" class="btn btn-success">
                    Accepter les cookies
                </button>
                <button @click="cookieBtn()" class="btn btn-deny">
                    Refuser les cookies
                </button>
            </div>
        </div><!-- Fermeture cookies -->
    </div><!-- Fermeture container -->
</template>

<script>
export default {
    methods: {
        cookieBtn(){
            const cookies = document.querySelector('.cookies')
            cookies.style.opacity = "0";
        }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}
html{
    font-size: 62.5%;/* 1rem = 10px*/
}
body{
    font-size: 1.4rem;/* soit 14px*/
    font-family: arial;
    color: white;
}
.container{
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.cookies{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;/*nécessaire de préciser une width si position:fixed*/
    background-color: #672932;
    display: flex;
    justify-content: space-between;/*positionner les DIV enfants*/
    align-items: center;/*centrer verticalement*/
    padding: 3rem;
    opacity: 1; /* modification de cette valeur en Javascript*/
    transition: 0.5s;
    color:white
}
.cookies-btn{
    display: flex;
}
.btn{
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 10px;
}
.btn.btn-success{
    background-color: #d4a449;
}
.btn.btn-success:hover{
    background-color: #b46773;
}
.btn.btn-deny{
    background-color: #672932;
}
.btn.btn-deny:hover{
    color: #b46773;
    background-color: #672932;
}
</style>