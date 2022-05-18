//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
import router from '../routes';
import ModifUser from "./ModifUser.vue";
import AddUser from "./AddUser.vue";
//import _ from 'lodash';
import { VueCardCarousel } from "vue-card-carousel";
export default {
name:"admin",
components: {
    VueCardCarousel,ModifUser,
    AddUser
  },
 data(){
 return{
     listeUser:[],
     listeCategories:[],
     itemParPage:15,
     roles:[],
     user:{},
     ajoutUser:{},
     nbPage:0,
     offset:0,
     categorie:{},
     addCategorieDialogue:false,
     total:0,
     search:"",
     page:1,
     editDialog:false,
     api:process.env.VUE_APP_BASE_URL,
     addUserDialog:false
    }
 },
    created(){
        this.initialize();
           
    },
    computed:{
        headers () {
            return [
              {
                text: 'nom',
                align: 'start',
                sortable: false,
                value: 'nom',
              },
              {
                text: 'Prenom',
                value: 'prenom',
              },
              {
                text: 'login',
                value: 'login',
              },
              { text: 'email', value: 'email' },
              { text: '', value: 'roles' },
              { text: '', value: 'actions' },
            ]
          },

          headersCat(){
              return [
{
  text: 'id',
  value: 'id',
},
{
  text: 'categorie',
  value: 'categorie',
},{
  text: 'icone',
  value: 'icon',
},
{ text: '', value: 'actions' },

              ]

          }
    },
    methods:{
        initialize(currentPage){
  
                            this.listeUser=[]
                            let offset=this.itemParPage*currentPage-1;
                            this.page=currentPage
                  Axios.post(this.api+"/api/admin/users",{limit:this.itemParPage,offset:0,search:this.search}).then(( {data} )=>{

               this.listeUser=data.alluser;
               this.total=data.total
               this.roles=data.roles
               
               this.nbPage= Math.round(this.total/this.itemParPage);
           
        })

        Axios.get(this.api+"/api/admin/categories").then(( {data} )=>{

          this.listeCategories=data.categories;

          
      
      
   })

        },
        addCat(){
     
          Axios.post(this.api+"/api/admin/categorie",this.categorie).then( ({data})=>{
           this.addCategorieDialogue=false
           this.initialize();
            })
        },
        edit(id){
           
           this.user= this.listeUser.filter( ( item )=>
                item.id==id
           
            )[0]
            this.editDialog=true;
        },

        editCat(id){
           
          this.categorie= this.listeCategories.filter( ( item )=>
               item.id==id
          
           )[0]
           this.addCategorieDialogue=true;
       },
        addUser(){
this.addUserDialog=true;
        },
        addCategories(){
this.addCategorieDialogue=true;
        },
        redraw(){
          console.log("redraw2")
          this.editDialog=false;
          this.addUserDialog=false;
          this.initialize();
        },
        deleteUser(id){
console.log(id)
          Axios.post(this.api+"/api/admin/users/delete",{id:id}).then( ({data})=>{
           
           this.initialize();
            })
        },
        deleteCat(id){
          console.log(id)
                    Axios.post(this.api+"/api/admin/categories/delete",{id:id}).then( ({data})=>{
                     
                     this.initialize();
                      })
                  },
        updateRole(id){
          this.user= this.listeUser.filter( ( item )=>
          item.id==id
     
      )[0]

      let data={};
      data["id_role"]=this.user.id_role
      Axios.put(this.api+"/api/admin/users",{id:id,data}).then( ({data})=>{
           
        this.initialize();
         })
        }

    },
    watch:{
      search:function (currentPage) {
        this.initialize(currentPage);
      }
    }
};
