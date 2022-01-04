<template>
<footer class="container-fluid">
    <div class="row">
        <div class="col">
            <ul class="footer-link">
                <li><a href="#" class="text-white">Conditions Générales de vente</a></li>
                <li><a href="#" class="text-white">About Us</a></li>
                <li><a href="#" class="text-white">Contact</a></li>
            </ul>
        </div>
    </div>
</footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Footer',

}
</script>
<style scoped>
.footer-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    margin:0;
    padding:0
}
a {
    list-style: none;
    text-decoration : none; 
    text-decoration-style : solid;
    }
li {
    /* padding: 0 0 5px; */
    margin: 0;
    
}
.col{
    padding:0;
    margin: 0;
}
.row{
    --bs-gutter-x: 0
}
.container-fluid {
    background-color:maroon;
    height: 100px;
    padding: 0;
    margin:0;
}
footer {
    position: fixed;
    height: 100px;
    bottom: 0;
    width: 100%;
}
</style>
