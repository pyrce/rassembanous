<template>
<v-container fluid class="grid grid-cols-12  ">
            <v-card class="elevation-12 h-100 w-full grid col-start-3 col-end-10" >
      <v-card-title  class="titles justify-center">
       Ajouter un évènement
      </v-card-title>
      <v-card-text class="mt-3 formulaire">
          <v-form ref="form" enctype="multipart/form-data" class="pa-5" >
        <v-row>
          Titre
    
            <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="event.nom"
              :rules="[ v => !!v || 'Titre est requis']"
            ></v-text-field>

        </v-row>

        <v-row>
          <v-col> Date debut </v-col>
          <v-col>
            <v-text-field hide-details name="dateDebut" v-model="event.dateDebut" single-line type="datetime-local"  :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Date fin </v-col>
          <v-col>
            <v-text-field hide-details name="dateDeFin" single-line v-model="event.dateFin" type="datetime-local" :rules="[ v => !!v || 'Ce champs est requis']" />
          </v-col>
        </v-row>

        <v-row>
          <v-col> Prix </v-col>
          <v-col>
            <v-text-field hide-details single-linename="prix" v-model="event.prix" type="number" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Nombre de place </v-col>
          <v-col>
            <v-text-field hide-details single-line name="nbPlace" type="number" v-model="event.nbPlace" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col> Public </v-col>
          <v-col>
            <v-checkbox label="label" name="isPublic" v-model="event.isPublic"></v-checkbox>
          </v-col>
          <v-col> Date limit </v-col>
          <v-col>
            <v-text-field hide-details single-line name="dateLimit" type="datetime-local" v-model="event.dateLimit" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          Lieu           <v-select
            v-model="event.id_lieu"
            :items="lieus"
            item-text="nomLieu"
            item-value="id"
            label="Select"
            persistent-hint
            single-line
          ></v-select>
          </v-col>
        </v-row>
        <v-row>

          <v-col>

          <v-select
            v-model="event.id_categorie"
            :items="categories"
            item-text="categorie"
            item-value="id"
            label="Select"
            persistent-hint
            single-line
          ></v-select>

          </v-col>
<v-col>
<v-file-input
 name="file"
 ref="file" 
 label="titre" 
  accept="*"
  v-model="event.affiche"
@change="handleFileUpload"
  outlined></v-file-input>
</v-col>


        </v-row>
        <v-row> Description </v-row>
        <v-row>
          <v-textarea name="name" label="label" v-model="event.description"></v-textarea>
        </v-row>

        <v-row>
          Partenaires :
          <v-autocomplete
            ref="refCombobox"
            :items="partenaires"
            :search-input.sync="search"
            no-filter
            v-model="liste"
            hide-details
            hide-selected
            item-text="nomMoral"
            item-value="id"
            placeholder="Où ?"
            return-object
            dense
            multiple
            class="caption"
            clearable
            hide-no-data
          ></v-autocomplete>
        </v-row>
        
          </v-form>
      </v-card-text>

      <v-card-actions>
  <v-btn color="warning" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
</v-container>

</template>

<script src="./ajout_event.js">
</script>
