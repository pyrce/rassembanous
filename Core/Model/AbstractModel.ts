import FieldsInterface from "../Interface/FieldsInterface";
import Database from "../Database/Database";
import Query from "../Database/Query";
/**
 * toutes les classes qui etendent cette classe ont acces à ses fonctions
 */
class AbstractModel {
    table: string;
    fields: Array<FieldsInterface> = [];
    ref?: AbstractModel
    query: Query;
    selection: any = []

    constructor(table: string, fields: Array<FieldsInterface>,ref?:AbstractModel) {
        this.table = table;
        this.fields = fields;
        this.ref=ref
        this.query = new Query(this)
    }

    public async findAll() {
        const queryString: string = this.query.select(this.selection).from(this.table).toString()
       
        return await this.runQuery(queryString)
    }

    public async find(data: Object,joinTable:any) {
        if(joinTable!=""){
            this.joinTable(joinTable)
        }
        // To IMPROVE (force find() method to accept anything else than Array or Object)
        const queryString: string = this.query.select(this.selection).from(this.table).where(data).toString()

        return await this.runQuery(queryString)
    }

public async insert(data: Object){
    const query:string=this.query.insertInto(data);
    return await this.runQuery(query)
}
public async update(search:Object, data: Object){
    const query=this.query.update(search,data);
    //return await this.runQuery(query)
}

    private resetSelection() {
        this.selection = []
    }

    public async delete(data:Object){
        const query:string=this.query.delete(data);
        return await this.runQuery(query)
    }


    private async runQuery(queryString: any) {
        try {
            this.resetSelection()
            const data: any = await Database.query(queryString)
            return data
        } catch (error) {
            console.log(error);
            return { error: error.toString() }
        }
    }
    private setJoin(queryString: string) {
        this.query.Join(queryString)
    }

    public joinTable(model: any) {
        const arrayFields: any = [];

        let notid= model.fields.filter( (item:any)=>{return item.field.match(/!id_/) })
        notid.forEach((element: any) => {
     
                arrayFields.push(` ${model.table}.${element.field} AS ${model.table}${element.field} `) 
            
        })

        const arrayFieldSelect = arrayFields.join(', ');
        this.query.Field(arrayFieldSelect);
        let id= model.fields.filter( (item:any)=>{return item.field.match(/id_/) })

        let joinQuery =" LEFT JOIN "+model.table+" on "+model.table+"."+id[0].field+"="+this.table+".id";
    
        this.setJoin(joinQuery)
   
    }
}

export default AbstractModel;