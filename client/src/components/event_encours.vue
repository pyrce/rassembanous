<template>
  <v-container>

 <v-col width="200vw">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col> {{ dataEvent.event.nom }} </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row> Lieu : {{ dataEvent.event.lieu }} </v-row>
            <v-row> description : {{ dataEvent.event.lieu }} </v-row>

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

      <v-col width="200vw">
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
        <v-row :id="map" height="100vh" width="200vw"> </v-row>
      </v-col>
 
      </v-container>
</template>

<script>


export default ({
name :"encours",
props:["dataEvent"],
data(){
    
}
})
</script>
