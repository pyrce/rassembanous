<template>
        <v-container>
      <div style="background-color:darkcyan;" class="col-12 d-flex justify-content-center">
{{ partenaire.nomMoral }}
      </div>

<v-btn> suivre</v-btn>
        <!-- event to get new desktop info from child component -->

      <div style="background-color:darkcyan;" class="col-12 d-flex justify-content-center">
Events
      </div>


  <v-col md='4' v-for='(evt,key) in listevents' :key='key'>

<v-card>
    <v-card-title>
      <v-row> 
       <v-col> <a :href="'/events/'+evt.id" > {{ evt.nomMoral }} </a>  </v-col>
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
    </v-container>
</template>

<script src="./Partenaire.js"></script>