<template>
    <main >
        <div class="p-5 mb-4 banner jumbotron">
            <div class=" py-5">
                <h1 class="display-5 fw-bold">Questions Fréquentes</h1>
                <p class="col-md-8 fs-4">Trouvez ici les réponses aux questions les plus posées</p>
            </div>
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            </div>
    </main>
</template>
<script>
export default {
    name: 'FAQs',

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