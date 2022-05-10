<template>

    <v-container>


        <!-- event to get new desktop info from child component -->
        <v-row>
  <v-col md='3' v-for='(part,key) in partenaires' :key='key'>

<v-card class="w-56 h-32 grid justify-content-center">
    <v-card-title>
      <v-row class="text-center"> 
   {{ part.nom }} 
        </v-row>
       
    </v-card-title>
    <v-card-text>
 <v-row> {{part.adresse }} </v-row>
      <v-row>

      </v-row>
    </v-card-text>
    <v-card-actions>
<v-btn @click="voirPart(part.id)"> Voir partenaire</v-btn>
    </v-card-actions>
</v-card>


</v-col>
        </v-row>

    </v-container>
</template>

<script src="./Partenaires.js"></script>
