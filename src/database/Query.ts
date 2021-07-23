import FieldsInterface from "../routers/FieldsInterface";
import Database from "./Database";

class Query {
    table: String;
    fields: Array<FieldsInterface> = [];

    listeChamp:string =""
    
    constructor(table: String, fields: Array<FieldsInterface>) {
        this.table = table;
        this.fields = fields

        this.listeChamp += fields[0].field;

        for(let i = 1; i < fields.length; i++) {
            this.listeChamp += `, ${fields[i].field}`
        }
    }

    async findAll() {

        const requestData = await Database.query(`SELECT ${this.listeChamp} FROM ${this.table}`, []);
        return requestData;

    }

    async findById(id: Number) {

        const requestData = await Database.query(`SELECT ${this.listeChamp} FROM ${this.table} where id = ?`, [id]);
        return requestData;

    }
}

export default Query;