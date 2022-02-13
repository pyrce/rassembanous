<template>
  <v-container height="35%">
    <v-row v-if="dataEvent.estTermine == 0">
      <v-col width="200vw">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col> {{ dataEvent.event.nom }} </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row> Lieu : {{ dataEvent.event.lieu }} </v-row>
            <v-row> description : {{ dataEvent.event.description }} </v-row>

            <v-row v-if="dataEvent.estInscrit == 0">
              <v-row
                v-if="
                  new Date( dataEvent.event.dateLimit).getTime() > new Date().getTime()
                "
              >
                    <v-card-actions>
        <v-btn @click="inscription">S'inscrire</v-btn>
      </v-card-actions>

              </v-row>
              <v-row v-else>
                <span
                  class="w-32 row-start-8"
                  style="background-color: F50756; opacity: 40%"
                  >Date limit dépassé</span
                >
              </v-row>
            </v-row>
            <v-row v-else>
              <span
                class="w-32 row-start-8"
                style="background-color: F50756; opacity: 40%"
                >Vous ête déjà inscrit</span
              >
              <button
                onclick="getQRCode('<%= event.id%>')"
                class="w-28 row-start-8"
                style="background-color: F50756; opacity: 40%"
              >
                Télécharger le QRCode
              </button>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="infos border-2 border-blue-400">

        <v-row
          style="background-color: darkcyan"
          class="col-12 d-flex justify-content-center"
        >
          Infos
        </v-row>
        <v-row> Date debut {{ dataEvent.event.dateDebut | formatDate }} </v-row>
        <v-row> Fin : {{ dataEvent.event.dateFin | formatDate }} </v-row>
        <v-row>
          Date limit : {{ dataEvent.event.dateLimit | formatDate }}
        </v-row>


 <div id="mapp" class="mt-5">
 <l-map
   :center="center"
   :zoom="zoom"
   class="map"
   ref="map"
   @update:zoom="zoomUpdated"
   @update:center="centerUpdated"
 >

   <l-tile-layer
     :url="url"
   >
   </l-tile-layer>

<v-row v-if="markers[0]">
<eventPlace
      v-for="marker in markers"
      :key="marker.id"
      :marker="marker"
>

</eventPlace>
</v-row>
   </l-map>
 </div>
      </v-col>
    </v-row>

<v-row  v-else>

</v-row>
  </v-container>
</template>

<style scoped>
 .map {
   position: absolute;
   width: 39%;
   height: 40%;
   overflow :hidden
 }
.infos{
  width: 270vh;
  height: 50vh;
}
</style>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="./event.js"></script>