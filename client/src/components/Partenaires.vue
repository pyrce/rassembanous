<template>

    <v-container>
      <div style="background-color:darkcyan;" class="col-12 d-flex justify-content-center">

      </div>

        <!-- event to get new desktop info from child component -->
        <v-row>
  <v-col md='4' v-for='(part,key) in partenaires' :key='key'>

<v-card>
    <v-card-title>
      <v-row> 
       <v-col> <a :href="'/partenaires/'+part.id" > {{ part.nomMoral }} </a>  </v-col>
      
        </v-row>
    </v-card-title>
    <v-card-text>

      <v-row>

      </v-row>
    </v-card-text>
</v-card>


</v-col>
        </v-row>

    </v-container>
</template>

<script src="./Partenaires.js"></script>
