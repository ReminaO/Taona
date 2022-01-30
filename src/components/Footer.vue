<template>
<footer class="footer mt-auto py-3 bg-light">
<div class="container">
    <span>
        <div class="py-5">
            <div class="row">
            <div class="col-6">
                <h5>Liens utiles</h5>
                <ul class="nav flex-column">
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Accueil</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Qui sommes-nous ?</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Contact</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">FAQs</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Conditions Générales de ventes</a></li>
                </ul>
            </div>

            <div class="col-4 offset-1">
                <form data-form-type="newsletter">
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div class="d-flex w-100 gap-2">
                    <label for="newsletter1" class="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" class="form-control" placeholder="Email address" data-dashlane-rid="c74a73d9b3078765" data-kwimpalastatus="alive" data-kwimpalaid="1643547080098-0" data-form-type="email">
                    <button class="btn btn-primary" type="button" data-dashlane-rid="02e3be4855f5f227" data-dashlane-label="true" data-form-type="action,subscribe">Subscribe</button>
                </div> 
                </form>
            </div>
            </div>

            <div class="d-flex justify-content-between py-4 my-4 border-top">
            <p>© 2022 TaonaCosmetics, Inc. All rights reserved.</p>
            <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
                <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
                <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
            </ul>
            </div>
        </div>
    </span>
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
.nav-link, p{
    color: #7d1426
}
.nav-link:hover {
    color:black
}
</style>
