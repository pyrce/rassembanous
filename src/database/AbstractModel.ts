import FieldsInterface from "../routers/FieldsInterface";
import Database from "./Database";
import Query from "./Query";
/**
 * toutes les classes qui etendent cette classe ont acces à ses fonctions
 */
class AbstractModel {
    table: String
    fields: Array<FieldsInterface> = [];
    query: any;

    constructor(table: String, fields: Array<FieldsInterface>) {
        this.table = table;
        this.fields = fields;
        this.query = new Query(this)
    }

    public  findAll() {
        const requete =  new Query(this);
        return  requete.findAll();
    }

    public async findById(id: Number) {
        const requete = await new Query(this);
        return requete.findById(id);
    }
}

export default AbstractModel;