<template>
    <section>
        <!-- HTML Element in which the Parcelshop Picker Widget is loaded -->
        <div id="Zone_Widget"></div>

        <!-- HTML element to display the parcelshop selected, for demo only. Should use hidden instead. -->
        <!-- <input type="text" id="Target_Widget" /> -->
    </section>
</template>

<script>
export default {
    name: 'Mondial Relay widget',
    mounted() {
        $(document).ready(function () {  
            $("#Zone_Widget").MR_ParcelShopPicker({   
                Target: "#ParcelShopCode",
                Brand: "BDTEST  ",
                Country: "FR",
                // Activer l'affichage Responsive.  
                Responsive: true,  
                // Afficher les résultats sur une carte?  
                ShowResultsOnMap: true,  
                // Habiller le widget aux couleurs Mondial Relay (thème par défaut si ce paramètre n'est pas renseigné)  
                Theme: "mondialrelay" // "inpost" pour mettre le thème Inpost  
            });  
        });  
    },
}
</script>

<style>

</style>