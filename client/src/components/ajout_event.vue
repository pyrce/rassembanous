<template>

            <v-card class="elevation-12" >
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ajout events</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-form ref="form">
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
            <v-text-field hide-details v-model="event.dateDebut" single-line type="datetime-local"  :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Date fin </v-col>
          <v-col>
            <v-text-field hide-details single-line v-model="event.dateFin" type="datetime-local" :rules="[ v => !!v || 'Ce champs est requis']" />
          </v-col>
        </v-row>

        <v-row>
          <v-col> Prix </v-col>
          <v-col>
            <v-text-field hide-details single-line v-model="event.prix" type="number" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
          <v-col> Nombre de place </v-col>
          <v-col>
            <v-text-field hide-details single-line type="number" v-model="event.nbPlace" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col> Public </v-col>
          <v-col>
            <v-checkbox label="label" v-model="event.isPublic"></v-checkbox>
          </v-col>
          <v-col> Date limit </v-col>
          <v-col>
            <v-text-field hide-details single-line type="datetime-local" v-model="event.dateLimit" :rules="[ v => !!v || 'Ce champs est requis']"/>
          </v-col>
        </v-row>
        <v-row>
          Lieu <v-text-field name="name" label="titre" :rules="[ v => !!v || 'Ce champs est requis']" outlined></v-text-field>
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
        <v-btn @click="submit">Validate</v-btn>
      </v-card-actions>
    </v-card>


</template>

<script src="./ajout_event.js">
</script>
