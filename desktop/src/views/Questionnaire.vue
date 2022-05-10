<template>
<v-container class="mt-10">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
    <v-btn  color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on" > Ajouter </v-btn>

        </template>
        <v-card>
          <v-card-title class="text-h5 text-black-300 title bg-customTitle/20">
        Modal ajout
          </v-card-title>
  
          <v-card-text>

<v-row class="flex align-center">

<v-col> Nom questionnaire</v-col>
<v-col>          
         <v-text-field
            v-model="QuestionnaireEvent.libelle"
            label="nom "
            class="mx-4"
          ></v-text-field>  </v-col>
</v-row>

<v-row class="flex align-center">

<v-col> Event </v-col>
<v-col>          
          <v-select
            :items="listeEvent"
            item-text="nom"
            v-model="QuestionnaireEvent.id_event"
            item-value="id"
            label="Select"
            persistent-hint
            single-line
          ></v-select>
           </v-col>
</v-row>

<v-row v-if="QuestionnaireEvent.libelle &&  QuestionnaireEvent.libelle.length>0 " >

<v-row>
<v-btn @click="addRow()">Ajouter un question </v-btn>
</v-row>

<v-row v-show="showInput">


<v-row class="flex align-center">
        <v-col>
        <v-text-field
            v-model="question"
            label="question"
            class="mx-4"
          ></v-text-field> </v-col>
         <v-col> <v-btn @click="sumbitQuestion()">Add </v-btn>   </v-col>
</v-row>

</v-row>

</v-row>

<v-row v-for="(quest,key) in QuestionnaireEvent.questions" :key="key">

            <v-text-field
            v-model="QuestionnaireEvent.questions[key].question"
            class="mx-4"
          ></v-text-field>     

</v-row>

          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>

<v-btn text  v-if="  QuestionnaireEvent.questions"   @click="sumbitQuestionnaire()">Add </v-btn>

          </v-card-actions>
        </v-card>

      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="dataEvent"
        item-key="id"
        class="elevation-1 w-full myTable"
      >
        <template  #[`item.total`]="{ item }" >

{{ item.questions.length }}
        </template>
        <template  #[`item.event`]="{ item }" >

{{ item.questionnaire.nom }}
        </template>


        <template  #[`item.actions`]="{ item }" >

<v-btn @click="goTo(item.id)">voir </v-btn>
<v-btn @click="modifier(item.id)">edit </v-btn>

        </template>

      </v-data-table>



</v-container>
</template>

<script src="./questionnaire.js">


</script>
