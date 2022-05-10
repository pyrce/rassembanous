<template>
            <v-card class="elevation-12" >
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ajout dataEvents</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-form ref="form" enctype="multipart/form-data">
        <v-row>
          Titre

            <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="dataEvent.nom"
              :rules="[ v => !!v || 'Titre est requis']"
            ></v-text-field>

        </v-row>

        <v-row>
          <v-col> Date debut </v-col>
          <v-col>
            <v-text-field hide-details name="dateDebut" v-model="dataEvent.dateDebut" single-line type="datetime-local"  :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Date fin </v-col>
          <v-col>
            <v-text-field hide-details name="dateDeFin" single-line v-model="dataEvent.dateFin" type="datetime-local" :rules="[ v => !!v || 'Ce champs est requis']" />
          </v-col>
        </v-row>

        <v-row>
          <v-col> Prix </v-col>
          <v-col>
            <v-text-field hide-details single-linename="prix" v-model="dataEvent.prix" type="number" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Nombre de place </v-col>
          <v-col>
            <v-text-field hide-details single-line name="nbPlace" type="number" v-model="dataEvent.nbPlace" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col> Public </v-col>
          <v-col>
            <v-checkbox label="label" name="isPublic" v-model="dataEvent.isPublic"></v-checkbox>
          </v-col>
          <v-col> Date limit </v-col>
          <v-col>
            <v-text-field hide-details single-line name="dateLimit" type="datetime-local" v-model="dataEvent.dateLimit" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>
        <v-row>
          Lieu <v-text-field name="lieu" label="titre" :rules="[ v => !!v || 'Ce champs est requis']" outlined></v-text-field>
        </v-row>
        <v-row>

          <v-col>

          <v-select
            v-model="dataEvent.id_categorie"
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
  v-model="dataEvent.affiche"
@change="handleFileUpload"
 outlined></v-file-input>
</v-col>


        </v-row>
        <v-row> Description </v-row>
        <v-row>
          <v-textarea name="name" label="label" v-model="dataEvent.description"></v-textarea>
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
            append-icon="search"
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
</template>


<script src="./MyEvent.js"></script>