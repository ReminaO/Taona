<template>
    <section>
        <!-- HTML Element in which the Parcelshop Picker Widget is loaded -->
        <div id="Zone_Widget"></div>
        <!-- Parcelshop code -->
        <input type="hidden" id="ParcelShopCode" name="ParcelShopCode" />
        <!-- HTML element to display the parcelshop selected, for demo only. Should use hidden instead. -->
        <div style="padding:8px; overflow:auto;">
            <div style="background:#edffb2; border:solid 1px #a5f913; padding:5px; font-family:verdana; fontsize:10px;">
                <em>Cette zone n'est pas située dans le Widget mais bien dans la page appelante.</em><br/><br/>
                <div style="display:inline-block; vertical-align:top;">
                    <!-- La balise ayant pour id "TargetDisplay_Widget" a été paramétrée pour reçevoir
                    l'ID du Point Relais sélectionné -->
                    Point Relais Selectionné : <input type="text" id="TargetDisplay_Widget" /><br/>
                    <!-- Balise HTML avec id "Target_Widget", paramétrée pour reçevoir l'ID
                    du Point Relais sélectionné -->
                    Hidden : <input type="text" id="ParcelShopCode" /><br/>
                    <!--Balise HTML avec id "TargetDisplayInfoPR_Widget" paramétrée pour recevoir
                    l'adresse du Point Relais sélectionné -->
                    InfosPR : <span id="TargetDisplayInfoPR_Widget"></span>
                </div>
                <hr />
                <div style="display:inline-block;">
                    <!-- Balises HTML utilisées dans la fonction de CallBack pour reçevoir des données à afficher -->
                    <div style="font-weight:bold;text-decoration:underline;">Callback zone</div><br/>
                    <div>data.ID = <span id="cb_ID"></span></div>
                    <div>data.Nom = <span id="cb_Nom"></span></div>
                    <div>data.Adresse = <span id="cb_Adresse"></span></div>
                    <div>data.CP = <span id="cb_CP"></span></div>
                    <div>data.Ville = <span id="cb_Ville"></span></div>
                    <div>data.Pays = <span id="cb_Pays"></span></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Mondial Relay widget',
    mounted() {
        $(document).ready(function() {
        // Charge le widget dans la DIV d'id "Zone_Widget" avec les paramètres indiqués
            $("#Zone_Widget").MR_ParcelShopPicker({
                //
                // Paramétrage de la liaison avec la page.
                //
                // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais (ex: input hidden)
                // Target: "#Target_Widget",
                Target: "#ParcelShopCode",
                Brand: "BDTEST  ",
                // Default Country (2 letters) used for search at loading
                Country: "FR",
                // Default postal Code used for search at loading
                PostCode: "59000",
                // Delivery mode (Standard [24R], XL [24L], XXL [24X], Drive [DRI])
                ColLivMod: "24R",
                // Number of parcelshops requested (must be less than 20)
                NbResults: "7",
                //
                // Display settings
                //
                // Enable Responsive (nb: non responsive corresponds to the Widget used in older versions=
                Responsive: true,
                    // Show the results on Leaflet map usng OpenStreetMap. 
                ShowResultsOnMap: true,
                // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais pour affichage
                TargetDisplay: "#TargetDisplay_Widget",
                // Selecteur de l'élément dans lequel sont envoyées les coordonnées complètes du point relais
                TargetDisplayInfoPR: "#TargetDisplayInfoPR_Widget",
                // // Fonction de callback déclenché lors de la selection d'un Point Relais
                OnParcelShopSelected:
                // Fonction de traitement à la sélection du point relais.
                // Remplace les données de cette page par le contenu de la variable data.
                // data: les informations du Point Relais
                function(data) {
                    $("#cb_ID").html(data.ID);
                    $("#cb_Nom").html(data.Nom);
                    $("#cb_Adresse").html(data.Adresse1 + ' ' + data.Adresse2);
                    $("#cb_CP").html(data.CP);
                    $("#cb_Ville").html(data.Ville);
                    $("#cb_Pays").html(data.Pays); 
                }
            });
        }); 
    },
}
</script>

<style>

</style>