<template>
      <v-container   style="height:120vh">
          <v-row class="w-full grid grid-cols-12">
      <v-data-table
        :headers="headers"
        :items="listeUser"
        item-key="id"
        class="elevation-1 w-full"
      >
        <template v-slot:top>
          <v-row class="grid grid-cols-12 py-5">
          <v-col>
          <v-text-field
            v-model="search"
            label="Rechercher "
            class="mx-4"
          ></v-text-field>

          </v-col>
                   <v-col class="grid py-1O  col-start-10 col-end-12 border-2 border-red-200 w-12">
                      <v-btn class="mx-2 grid grid-cols-4 col-start-4 w-48" @click="addUser()">
                Ajout utilisateur
            </v-btn>
                   </v-col>
          </v-row>
        </template>
        <template  #[`item.roles`]="{ item }" >
          <v-select
            :items="roles"
            item-text="role"
            v-model="item.id_role"
            item-value="id"
            label="Select"
            persistent-hint
            @change="updateRole(item.id)"
            single-line
          ></v-select>

        </template>
       <template #[`item.actions`]="{ item }" >

            <v-btn class="mx-2" icon @click="deleteUser(item.id)">
                <v-icon >mdi-delete</v-icon>
            </v-btn>

                        <v-btn class="mx-2"     
            icon @click="edit(item.id)">
                <v-icon >mdi-pen</v-icon>
            </v-btn>

        </template>
      </v-data-table>


    <ModifUser v-if="editDialog==true" :user="user" :editDialog="editDialog" @redraw="redraw"></ModifUser>
 <AddUser v-if="addUserDialog==true" :roles="roles" :addUserDialog="addUserDialog" @redraw="redraw"></AddUser>




          </v-row>
      </v-container>
</template>

<script src="./Admin.js">
</script>
