import Database from "./Database";
import Query from "./Query";

class AbstractModel {
    table: String
    fields: Array<object> = [];
    constructor(table: String, fields: Array<object>) {
        this.table = table;
        this.fields = fields;
    }

    public  findAll() {
        const requete =  new Query(this.table);
        return requete.findAll();
    }

    public async findById(id: Number) {
        const requete = await new Query(this.table);
        return requete.findById(id);
    }
}

export default AbstractModel;