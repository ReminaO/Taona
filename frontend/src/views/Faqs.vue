<template>
    <main >
        <div class="p-5 mb-4 banner jumbotron">
            <div class=" py-5">
                <h1 class="display-5 fw-bold">Questions Fréquentes</h1>
                <p class="col-md-8 fs-4">Trouvez ici les réponses aux questions les plus posées</p>
            </div>
        </div>
        <div class="faqs-container">
            <div class="accordeon">
                <!-- Question 1 -->
                <div class="question" @click="switchToClose()" v-if="mode == 'close' || mode == 'open'">
                    <p> question 1</p>
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="reponse" @click="switchToOpen()" v-if="mode == 'open'">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <i class="bi bi-chevron-up"></i>
                </div>
                <!-- Ici Question 2 -->
                <!-- Ici Question 3 -->

                <div class="question" @click="switchToClose2()" v-if="mode2 == 'close2' || mode2 == 'open2'">
                    <p> question 2</p>
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="reponse" @click="switchToOpen2()" v-if="mode2 == 'open2'">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <i class="bi bi-chevron-up"></i>
                </div>
                <div class="question" @click="switchToClose3()" v-if="mode3 == 'close3' || mode3 == 'open3'">
                    <p> question 3</p>
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="reponse" @click="switchToOpen3()" v-if="mode3 == 'open3'">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <i class="bi bi-chevron-up"></i>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    data (){
        return {
            mode: 'close',
            mode2: 'close2',
            mode3: 'close3'
        }
    },
    methods:{
        switchToOpen() {
            this.mode = 'close';
        },
        switchToClose() {
            this.mode = 'open';
        },
        switchToOpen2() {
            this.mode2 = 'close2';
        },
        switchToClose2() {
            this.mode2 = 'open2';
        },
        switchToOpen3() {
            this.mode3 = 'close3';
        },
        switchToClose3() {
            this.mode3 = 'open3';
        },
    }
}

</script>
<style scoped>
    .banner{
        background-color: #672932;
        color: #d4a449;
        -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
        box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
    }
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
    }
    .faqs-container{
        height: 80vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .banniere-titre{
        margin-bottom: 1rem;
    }
    .accordeon{
        width: 60%;
        background-color: #672932;
        border: 1px solid #d4a449;
        font-size: 1.2rem;
        color: white;
    }
    .question{
        display: flex; /*permet de positionner <p> et <i>*/
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        border-bottom: 1px solid #d4a449;
    }
    .reponse{
        color: #672932;
        background-color: #eee;
        padding: 3rem;
        display: flex; /*permet de positionner <p> et <i>*/
        justify-content: space-between;
        align-items: center;
    }
    .visible{
        display: block;
    }

</style>