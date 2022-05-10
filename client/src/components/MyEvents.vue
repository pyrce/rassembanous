<template>

    <v-container>

        <!-- event to get new desktop info from child component -->
   
      <v-data-table
        :headers="headers"
        :items="listeEvents"
        item-key="id"
        class="elevation-1 w-full"
      >
        <template  #[`item.dateDebut`]="{ item }" >

{{ item.dateDebut | formatDate }}
        </template>

        <template  #[`item.dateFin`]="{ item }" >

{{ item.dateFin | formatDate }}
        </template>


        <template  #[`item.actions`]="{ item }" >

<v-btn  @click="handleEvent(item.id)">Modifier </v-btn>
        </template>

      </v-data-table>

       

    </v-container>
</template>

<script src="./MyEvents.js"></script>
