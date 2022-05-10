<template>
        <v-container>
          <v-row>
      <div  class="titre col-12 d-flex justify-content-center">
{{ partenaire.nom }}
      </div>
</v-row>

   <v-row>

<v-btn v-if="isFollowed==false" @click="suivrePart(partenaire.id)"> suivre</v-btn>

<v-row v-else> vous suivez se partenaire</v-row>
        <!-- event to get new desktop info from child component -->

  <span class="titre h-12 w-full"> Evenements </span>

</v-row>
<v-row class="grid grid-cols-12">
  <v-col md='4' v-for='(evt,key) in listevents' :key='key'>

<v-card  class="grid grid-cols-1">
    <v-card-text>
<div v-for='(m,key) in evt.media' :key='key' id="affiche" class="flex justify-center">

      <img :src="'/image/'+m.image"     height="50"
           width="300vw" >
</div>
           

    </v-card-text>
    <v-card-action class="flex justify-center align-center bg-red-100 h-12">
  <a href="#" @click="gotoEvent(evt.id)"> {{  evt.nom }}</a>
    </v-card-action>

</v-card>

</v-col>
</v-row>

    </v-container>
</template>

  <script src="http//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="./Partenaire.js"></script>