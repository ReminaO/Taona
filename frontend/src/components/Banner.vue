<template>
    <div class="container">
        <!-- DIV cookies -->
        <div class="cookies">
            <div class="cookies-texte">
                <p>En poursuivant, vous acceptez l'utilisation des cookies par le site afin de vous proposer des contenus adaptés et réaliser des statistiques.
                </p>
            </div>
            <div class="cookies-btn">
                <button @click="cookieBtn()" class="btn btn-danger">
                    Accepter les cookies
                </button>
                <button @click="noCookieBtn()" class="btn btn-deny">
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
            //setting cookie for 1 month, cookie will be expired automatically
            document.cookie="Taona=TaonaCosmetics; Secure; max-age="+60*60*24*30
            const cookies = document.querySelector('.cookies')
            if(document.cookie){
                // cookies.style.opacity = "0"; //hide cookie box once cookie set
                cookies.classList.add("hide");
            }else{
                alert("Cookie can't be set") //If cookie can't be set, an error message occurs
            }
        },
        noCookieBtn(){
            const cookies = document.querySelector('.cookies')
            cookies.style.opacity="0"
        }
    },
    mounted(){
        let checkCookie = document.cookie.indexOf("Taona=TaonaCosmetics")//Checking our set cookie
        const cookies = document.querySelector('.cookies')
        checkCookie !=-1 ? cookies.classList.add("hide"):cookies.classList.remove("hide")
    },
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
/* .container{
    /* height: 80vh; 
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
} */
.cookies{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;/*nécessaire de préciser une width si position:fixed*/
    background-color: #672932;
    display: flex;
    justify-content: space-between;/*positionner les DIV enfants*/
    align-items: center;/*centrer verticalement*/
    padding: 0.5rem;
    opacity: 1; /* modification de cette valeur en Javascript*/
    transition: 0.5s;
    color:white
}
.cookies.hide{
    opacity:0;
    visibility:hidden;
    transition: all 0.3s ease;
}
.cookies-btn{
    display: flex;
}
.btn{
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 10px;
    margin-right:10px
}
.btn.btn-danger{
    background-color: #d4a449;
}
.btn.btn-danger:hover{
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