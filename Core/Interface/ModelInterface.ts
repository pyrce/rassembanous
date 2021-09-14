import { Module } from "module";
import FieldsInterface from "./FieldsInterface";


interface ModelInterface {
    fields :FieldsInterface[];
    table :string;

   
} 

export default ModelInterface;