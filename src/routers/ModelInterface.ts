import { Module } from "module";
import FieldsInterface from "./FieldsInterface";


interface ModelInterface {
    fields :FieldsInterface[];
    table :string;

   
} 
 function getFields(model:ModelInterface){
        return model.fields
    } 

    function getTable(model:ModelInterface){
        return model.table
    } 
export default ModelInterface;