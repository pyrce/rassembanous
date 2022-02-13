import FieldsInterface from "../Interface/FieldsInterface";

class Query {
    private fields: Array<FieldsInterface> = [];
    private myQuery: string = "";
    private conditions: string = "";
    private table: string;
    private fieldToSelect: Array<any> = []
    private valuesToInsert: Array<any> = []
    private tableJoins: Array<any> = []
    private queryLimit:string="";
    selectedJoin: string = "";
    selectedJoinField: Array<any> = []


    constructor(table: string,fields: Array<FieldsInterface>) {
        this.table = table
        this.fields = fields
       // this.selectedJoin="";
    }

    select(args: any) {

        this.fieldToSelect = args;

        return this;
    }

    where(args: any) {
        let conditions: string = ""

        if ((typeof args === 'object') && args!="undefined") {
            conditions += " (" + this.and(args) + ")"
        }

        if (conditions) this.conditions += " WHERE " + conditions

        return this;
    }

    and(args: any) {
        let conditions: string = ""
        const keys: any = Object.keys(args)
        let n=0;
   

        if (args[0]) {

            keys.map( (key: any, index: number) => {
        
              let  keys2= Object.keys(args[key] );

               let args2=Object.values(args[key]);

                if (key && index === 0) conditions += keys2[index] +" "+args2[index+1] +" '"+ args2[index]+"'"
                if (key && index > 0){ conditions += " AND " +  keys2[0] +" "+ args2[1]+" '" + args2[0] + "'" }
      
            })
        } else {

            conditions += this.table+"."+ keys + " = '" + args[keys] + "'"
             
        }
     
        return conditions;
    }

    limit(data:any){
        let limit="";
        

        if(data["limit"]){
       
            limit=" limit "+data ["limit"];
            if(data["offset"]){
                limit+=" offset "+data["offset"]
            }
        }
        
        this.queryLimit=limit;
        return this;
    }
    from(table: any, alias: any = null) {
        if (!alias) {
            this.table = table;
        } else {
            this.table = `${table} AS ${alias}`;
        }
        return this;
    }

    joins(table: any) {
        if (table != "") {
            this.tableJoins.push(table);
        }
    
        return this;
    }
    insertInto(args: any) {
        const keys: any = Object.keys(args);
        const vals: any = Object.values(args);

        let arrayField: string = `${keys[0]}`;
        let arrayValues: string = `'${vals[0]}'`;

        for (let i = 1; i < keys.length; i++) {
            arrayField += `, ${keys[i]}`;
        }

        for (let i = 1; i < vals.length; i++) {
            arrayValues += `, '${vals[i]}'`;
        }

        return `INSERT INTO ${this.table} (${arrayField}) values (${arrayValues})`;


    }

    delete(args: any) {

        let conditions: string = ""
        const keys: any = Object.keys(args)
        if (keys && keys.length > 1) {
            keys.map((key: any, index: number) => {
                if (key && index === 0) conditions += key + " = " + args[key]
                if (key && index > 0) conditions += " AND " + key + " = '" + args[key] + "'"
            })
        } else {
            conditions += keys[0] + " = '" + args[keys[0]] + "'"
        }

    
        return "DELETE FROM " + this.table + " WHERE " + conditions;
    }

    values(where: Object, args: any) {
        this.valuesToInsert = args;

        return this;
    }


    update(search: Object, args: any) {

        const keys: any = Object.keys(args);
        const vals: any = Object.values(args);

        const keys2: any = Object.keys(search);
        const vals2: any = Object.values(search);

        let conditionSearch: string = `${keys2[0]} = ${vals2[0]}`;

        for (let i = 1; i < keys2.length; i++) {
            conditionSearch += ` AND ${keys2[i]} = '${vals2[i]}'`;
        }

        let arrayField: string = `${keys[0]} = '${vals[0]}'`;

        for (let i = 1; i < keys.length; i++) {
            arrayField += `, ${keys[i]} = '${vals[i]}'`;
        }

        return `UPDATE ${this.table} SET ${arrayField} WHERE ${conditionSearch}`;
    }

    Join(queryString: any) {
  
        
        this.selectedJoin = queryString;
       
    };
    setJoinField(joinFields: any) {

        if (joinFields === void 0) { joinFields = null; }
        if (joinFields)
            this.selectedJoinField = joinFields;
            //console.log(joinFields);
    };
    toString() {

        let query = "SELECT ";
        let allfields: any = [];

        this.fieldToSelect.forEach(field => {
            let column = `${this.table}.${field.field}`;

            allfields.push(column)
        })
        let selectFields = allfields.join(",");


        if (this.selectedJoin != "") {
            let field_a: any = [];

            this.selectedJoinField.forEach(field => {

                let column = `${field}`;

                field_a.push(column)

            })


            let joinstring = field_a.join(", ")

            query += selectFields + "," + joinstring;


            query += " FROM " + this.table + this.selectedJoin;
        }
        else {
            query = "SELECT " + selectFields + " FROM " + this.table;
        }

        if (this.conditions) {
            query += this.conditions
        }
        if (this.queryLimit) {
            console.log(this.queryLimit)
            query += this.queryLimit
        }

        this.fieldToSelect = []
        this.table = ""
        this.conditions = ""
        this.queryLimit = ""
  console.log(query)
        return query
    }
}

export default Query;