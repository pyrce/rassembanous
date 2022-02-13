<template>

    <v-container>
      <v-row style="background-color:darkcyan;" class="grid grid-cols-12 flex justify-center">
 Events recents

      </v-row>

        <!-- event to get new desktop info from child component -->
        <v-row>
  <v-col md='4' v-for='(evt,key) in listeEvents' :key='key'>

<v-card width="15vw">
    <v-card-title>
      <v-row> 
       <v-col>  {{ evt.nom }}   </v-col>
      <v-col>   {{ evt.categorie }} </v-col>
        </v-row>

  <v-row>  {{ evt.dateDebut }}</v-row>
    </v-card-title>
    <v-card-text>

      <img :src="'/image/'+evt.affiche"     height="250"
           width="350vw" >
      <v-row>
 {{ evt.description }}
      </v-row>
    </v-card-text>
</v-card>
</v-col>


        </v-row>

        <div class="grid grid-cols-12 gap-1">
<v-col v-for='(p,key) in nbPage' :key="key">


 <v-btn @click="getEvents(p)">{{ p }}</v-btn>

</v-col>
        </div>
    </v-container>
</template>

<script src="./Events.js"></script>
