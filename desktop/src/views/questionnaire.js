/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';


//import _ from 'lodash';
export default {
name:"event",
components: {

  },
 data(){
 return{
    dataEvent:{},
    partenaires:[],
    question:"",
    edit:false,
    showInput:false,
    api:process.env.VUE_APP_BASE_URL,
    listeEvent:[],
    QuestionnaireEvent:{},
     dialog:false,
     stand:{},
     disabled:false,
     date: new Date().toISOString().substr(0, 10),
    }
 },
    created(){
        console.log("composant events");
        
  
        this.initialize();

    },
    computed:{
      headers () {
          return [
            {
              text: 'libelle',
              align: 'center',
              sortable: false,
              value: 'libelle',
              class:"tableHeader"
            },
            {
              text: 'Nombre de question',
              value: 'total',
              align: 'center',
              class:"tableHeader"
            },
{
    text:"evenement",
    value:"event",
    align: 'center',
    class:"tableHeader"

},           { text: '', value: 'actions',              class:"tableHeader",  align: 'center' },
     
          ]
        }
  },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.get(this.api+"/questions").then( ( {data} )=>{
                this.dataEvent=data;
              

        })

        console.log("end init");
        },

        ajoutQuestionnaire(){

          this.dialog=true
        },sumbitQuestion(){

          if(!this.QuestionnaireEvent.questions)
{
  this.QuestionnaireEvent.questions=[]
}

          this.QuestionnaireEvent.questions.push( {question:this.question})

          this.showInput=false
        },
        sumbitQuestionnaire(){
          Axios.post(this.api+"/questions",this.QuestionnaireEvent).then( ({data}) =>{
            this.dialog=false;
            this.initialize();
        })

        },
        goTo (id) {
       
this.$router.push("/questions/"+id);
          
          },
          modifier(id){
            this.dialog=true
            this.edit=true
            Axios.get(this.api+"/questions/"+id).then( ( {data} )=>{
              this.QuestionnaireEvent=data;
            

      })


          },
          addRow(){
            this.showInput=true
          }
     
    },
    watch:{
      dialog:function(val){
        if(val){
          Axios.get(this.api+"/events").then( ({data}) =>{
          this.listeEvent=data.currentEvents;
          })
        }

      }
    }
    
};
