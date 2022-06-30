<template>
  <main>
    <div class="p-5 mb-4 banner jumbotron">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Contactez-nous !</h1>
          <p class="col-md-8 fs-4">Laissez nous un messsage pour nous poser vos questions ou partager votre expérience</p>
        </div>
    </div>
    <div class="contact-container">
      <div class="contact-form">
        <form action="https://formsubmit.co/cb371dfc9a5e756ce73f98745a0f1d77" method="POST">
          <img src="../assets/img/Logo3.png" alt="Logo TaonaCosmetics"><br>
          <label for="firstName">Prénom :</label>
          <input id="firstName" type="text" name="firstName" required/><br>
          <label for="lastName" >Nom :</label>
          <input id="lastName" type="text" name="lastName" required/><br>
          <label for="email">Email :</label>
          <input id="email" type="email" name="email" required/><br>
          <label for="message">Message :</label><br>
          <textarea name="message" id="message" cols="100" rows="10" required></textarea><br>
          <button type="submit"> Envoyer</button>
        </form> 
      </div>
    </div>
  </main>  
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
   
  }
}
</script>
<style scoped>
  .contact-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contact-form{
    margin: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    text-align: center;
    background: white;
    color: #672932;
    background-position: 50% 50%;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 100px;
    font-size: 20px;
  }
  img{
    height: 250px;
  }
  input,textarea{
    margin-top:20px;
    margin-left:20px;
    padding:8px;
    border: #672932 solid 1px;
    border-radius: 8px;
    background-color: white;
    font-weight: 500;
    font-size: 20px;
    flex:1;
    min-width: 100px;
    color: #672932;
    outline:rgb(255, 101, 70);
    display: flex;
    justify-content: left;
  }
  label{
    margin-top:20px;
    display: flex;
    justify-content: left;
  }
  textarea{
    min-height: 100px;
    height:200px;
    min-height: 150px;
    width: 100%;
  }
  .message-container{
    display: flex;
    align-items: center;
  }
.banner{
  background-color: #672932;
  color: #d4a449;
  -webkit-box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
box-shadow: 0 15px 15px 5px rgba(103,41,50,0.1);
}
button {
  background-color:#d4a449;
  color:rgba(255,255,255,1);
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 20px;
  border: none;
  margin:20px;
  }
button:hover {
  background-color:#b46773;
  color:rgba(255,255,255,1);
}
</style>
