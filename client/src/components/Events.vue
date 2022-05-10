<template>

    <v-container class="flex flex-column">

<v-row v-for="(cat,key) in listeEvents" :key="key" class=" grid grid-cols-12 grid-rows-6 mt-15">
<v-card class="grid grid-cols-12 w-full">
    <v-card-title>
  <v-row class="w-full grid border-2 border-black-500 grid-cols-12 ma-0"> 

   <v-col class=" col-start-1 col-end-3"> <v-icon>{{cat.icon }} </v-icon> </v-col>
    
    <v-col class=" col-start-3 col-end-12">  {{ cat.categorie }} </v-col>
    
    </v-row>
    </v-card-title>
<v-row class=" bg-red-100 ma-3">
<v-col v-for="(evt,key) in cat.events" :key="key">

<v-card class="w-48 ma-5">
 <v-card-title> {{ evt.nom }}</v-card-title>
 <v-card-text> {{ evt.dateDebut | formatDate}} </v-card-text>


 <img :src="'/image/'+evt.affiche" />
   
</v-card>


</v-col>

</v-row>

<v-card-actions>
<v-btn @click="voirCategorie(cat.id)">voir cette categorie</v-btn>
</v-card-actions> 
</v-card>
</v-row>
    </v-container>
</template>

<script src="./Events.js"></script>
