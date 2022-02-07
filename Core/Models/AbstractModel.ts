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

    constructor(table: string, fields: Array<FieldsInterface>,ref?:AbstractModel) {
        this.table = table;
        this.fields = fields;
        this.ref=ref
        this.query = new Query(table,fields)
    }

    public async findAll(data?:Object) {
        const queryString: string = this.query.select(this.fields).from(this.table).where(data).toString()
       
        return await this.runQuery(queryString)
    }

    public async find(data: Object) {
 
        // To IMPROVE (force find() method to accept anything else than Array or Object)
        const queryString: string = this.query.select(this.fields).from(this.table).where(data).toString()

        return await this.runQuery(queryString)
    }

    public setJoinTable(joinTable:any){
        this.joinTable(joinTable)
    } 
public async insert(data: Object){
    const query:string=this.query.insertInto(data);
    return await this.runQuery(query)
}
public async update(search:Object, data: Object){
    const query=this.query.update(search,data);
    //return await this.runQuery(query)
}



    public async delete(data:Object){
        this.query = new Query(this.table, this.fields)
        const query:string=this.query.delete(data);
        return await this.runQuery(query)
    }


    private async runQuery(queryString: any) {
        try {

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

    public joinTable(models: any) {
      //  this.setJoin("")

 models.forEach((model:any) => {
     

const arrayFields: any = [];

        model.class.fields.forEach((element: any) => {
            if(!element.field.includes('id_')){
                arrayFields.push(` ${model.class.table}.${element.field} AS '${model.class.table}${'_'}${element.field}' `) 
            }
        })

       this.query.setJoinField(arrayFields)

        //let id= model.fields.filter( (item:any)=>{return item.field.match(/id_/) })

        let joinQuery =" LEFT JOIN "+model.class.table+" on "+model.class.table+"."+model.fk+"="+this.table+".id";

        this.setJoin(joinQuery)
  });
    }
}

export default AbstractModel;