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
     itemParPage:15,
     roles:[],
     user:{},
     ajoutUser:{},
     nbPage:0,
     offset:0,
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
          }
    },
    methods:{
        initialize(currentPage){
  
                            this.listeUser=[]
                            let offset=this.itemParPage*currentPage-1;
                            this.page=currentPage
                  Axios.post("/admin/users",{params:{limit:this.itemParPage,offset:0,search:this.search}}).then(( {data} )=>{

               this.listeUser=data.alluser;
               this.total=data.total
               this.roles=data.roles
               
               this.nbPage= Math.round(this.total/this.itemParPage);
           
        })


        },
        edit(id){
           
           this.user= this.listeUser.filter( ( item )=>
                item.id==id
           
            )[0]
            this.editDialog=true;
        },
        addUser(){
this.addUserDialog=true;
        },
        redraw(){
          console.log("redraw2")
          this.editDialog=false;
          this.addUserDialog=false;
          this.initialize();
        },
        deleteUser(id){
console.log(id)
          Axios.post("/admin/users/delete",{id:id}).then( ({data})=>{
           
           this.initialize();
            })
        },
        updateRole(id){
          this.user= this.listeUser.filter( ( item )=>
          item.id==id
     
      )[0]

      let data={};
      data["id_role"]=this.user.id_role
      Axios.put("/admin/users",{id:id,data}).then( ({data})=>{
           
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
