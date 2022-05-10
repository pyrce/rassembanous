<template>
  <v-container  class="border-2 border-red-100 grid  grid-flow-row auto-rows-max" style="height:120vh">


<v-row class="grid grid-cols-12 my-5 bg-customTitle/20"> 
<v-col class="grid col-start-4 col-span-5 text-center rounded rounded-lg"> Liste des partenaires - {{ dataEvent.event.nom }} </v-col>
</v-row>


<v-row   v-if="dataEvent.listePartenaireEvent.length>0"> 

      <v-data-table
    
        :headers="headers"
        :items="dataEvent.listePartenaireEvent"
        item-key="id"
        class="elevation-1 w-full"
      >

       <template  #[`item.nom`]="{ item }" >

{{ item.idUser.nom }}

        </template>

       <template  #[`item.prenom`]="{ item }" >

{{ item.idUser.prenom }}

        </template>

        <template  #[`item.stand`]="{ item }" >
          <v-select
            :items="dataEvent.stands"
            item-text="nomStand"
            item-value="id"
            label="Select"
            v-model="item.id_stand"
            @change="setStand(dataEvent.event.id,item.idUser.id)"
            persistent-hint
            single-line
          ></v-select>

        </template>

      </v-data-table>

</v-row>
      <v-row v-else classs="grid col-start-3 col-end-10">
   Pas de partenaire 
      </v-row>







  </v-container>
</template>

<style scoped>
 .map {
   position: absolute;
   width: 40%;
   height: 20%;
   overflow :hidden
 }

</style>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="./event.js"></script>