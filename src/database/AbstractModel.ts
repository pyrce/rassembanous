import FieldsInterface from "../routers/FieldsInterface";
import Database from "./Database";
import Query from "./Query";

class AbstractModel {
    table: String
    fields: Array<FieldsInterface> = [];
    query: any;

    constructor(table: String, fields: Array<FieldsInterface>) {
        this.table = table;
        this.fields = fields;
        this.query   = new Query(table, fields)
    }

    public  findAll() {
        const requete =  new Query(this.table,this.fields);
        return requete.findAll();
    }

    public async findById(id: Number) {
        const requete = await new Query(this.table,this.fields);
        return requete.findById(id);
    }
}

export default AbstractModel;