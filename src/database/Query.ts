import FieldsInterface from "../routers/FieldsInterface";
import AbstractModel from "./AbstractModel";
import Database from "./Database";
/**
 * Classe qui defini une query afin d'être instanciée dans l'abstractmodele
 */
class Query {
    table: String;
    fields: Array<FieldsInterface> = [];

    listeChamp: string = ""

    constructor(model:AbstractModel) {
        this.table = model.table;
        this.fields = model.fields

        this.listeChamp += this.fields[0].field;
        /**
         * initialise les champs a recuperer
         */
        for (let champ in this.fields) {
            this.listeChamp += `, ${this.fields[champ].field}`
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

        /**Fonction qui retourne un objet avec les fields
     * 
     * @param data 
     * @param fields 
     * @returns array object
     */
         public static sanitizeData(data: any, fields: any) {
            let item: any;
            const keys: any = fields.map((field: any) => field.name);
    
            if (Array.isArray(data)) {
                var temp: any = []
                data.map((elem: any) => {
                    item = {}
                    keys.map((key: string) => {
                        item[key] = elem[key];
                    })
                    temp.push(item);
                })
                return temp
            } else {
                keys.map((key: string) => {
                    item[key] = data[key]
                })
                return item;
            }
        }
}

export default Query;