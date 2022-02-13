<template>

    <v-container>
      <div style="background-color:darkcyan;" class="grid grid-cols-12 ">
 <div class=" grid grid-cols-11 col-start-1 col-end-11  flex justify-center"> Events recents</div>
 <v-btn @click="getEventRecent" >voir plus</v-btn>
      </div>

        <!-- event to get new desktop info from child component -->
        <v-row>
  <v-col md='4' v-for='(evt,key) in listeCurrentEvent' :key='key'>

<v-card width="40%" class="shadow-lg">
    <v-card-title>
      <v-row> 
       <v-col>  {{ evt.nom }}  </v-col>
      <v-col class="event_cat">   {{ evt.categorie }} </v-col>
        </v-row>
  <v-row>  {{ evt.lieu }}</v-row>
  <v-row>  {{ evt.dateDebut | formatDate}}</v-row>
    </v-card-title>
    <v-card-text>

      <img :src="'/image/'+evt.affiche"     height="250"
           width="350vw" >
      <v-row>
 {{ evt.description }}
      </v-row>
    </v-card-text>
          <v-card-actions>
        <v-btn @click="gotoEvent(evt.id)">voir</v-btn>
      </v-card-actions>
</v-card>
</v-col>
        </v-row>

      <div style="background-color:darkcyan;" class="grid grid-cols-12">
<div class=" grid grid-cols-11 col-start-1 col-end-10 text-center"> Events passé</div>
 <v-btn @click="getEventPasse" class="grid grid-cols-2 col-start-10 col1-end-12">voir plus</v-btn>
      </div>

        <v-row>
  <v-col md='4' v-for='(evt,key) in lastEvents' :key='key'>

<v-card width="40%">
    <v-card-title>
      <v-row> 
       <v-col>  {{ evt.nom }} </v-col>
      <v-col class="event_cat">   {{ evt.categorie }} </v-col>
        </v-row>
  <v-row>  {{ evt.lieu }}</v-row>
  <v-row>  {{ evt.dateDebut }}</v-row>
    </v-card-title>
    <v-card-text>

      <img :src="'/image/'+evt.affiche"     height="250"
           width="350vw" >
      <v-row>
 {{ evt.description }}
      </v-row>
    </v-card-text>
              <v-card-actions>
        <v-btn @click="gotoEvent(evt.id)">voir</v-btn>
      </v-card-actions>
</v-card>
</v-col>
        </v-row>

    </v-container>
</template>

<script src="./home.js"></script>
<style >
.event_cat{
  background-color: #1BF581;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
}

</style>