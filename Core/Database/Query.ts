import { runInThisContext } from "vm";
import AbstractModel from "../Model/AbstractModel";

class Query {
    private fields: Array<any> = [];
    private myQuery: string = "";
    private conditions: string = "";
    private table: string;
    private fieldToSelect: Array<any> = []
    private valuesToInsert: Array<any> = []
    private tableJoins: Array<any> = []
    selectedJoin: string = "";
    selectedJoinField: string = "";


    constructor(model: AbstractModel) {
        this.table = model.table
        this.fields = model.fields
    }

    select(args: any) {

        this.fieldToSelect = args;

        return this;
    }

    where(args: any) {
        let conditions: string = ""
        if ((typeof args === 'object') && !Array.isArray(args)) {
            conditions += " (" + this.and(args) + ")"
        } else if (Array.isArray(args)) {
            args.map((arg: any, index: number) => {
                if (arg && index === 0) conditions += " (" + this.table + "." + this.and(arg) + ")"
                if (arg && index > 0) conditions += " OR " + " (" + this.table + "." + this.and(arg) + ")"
            })
        }

        if (conditions) this.conditions += " WHERE " + conditions

        return this;
    }

    and(args: any) {
        let conditions: string = ""
        const keys: any = Object.keys(args)
        if (keys && keys.length > 1) {
            keys.map((key: any, index: number) => {
                if (key && index === 0) conditions += key + " = " + args[key]
                if (key && index > 0) conditions += " AND " + key + " = '" + args[key] + "'"
            })
        } else {
            conditions += this.table + "." + keys[0] + " = '" + args[keys[0]] + "'"
        }
        return conditions;
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

        console.log(`INSERT INTO ${this.table} (${arrayField}) values (${arrayValues})`)
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
        this.selectedJoin += queryString;
    };
    Field(joinFields: any) {
        if (joinFields === void 0) { joinFields = null; }
        if (joinFields)
            this.selectedJoinField += ", " + joinFields + " ";
    };

    toString() {
        const allFields: string = (this.fieldToSelect.length > 0) ? this.fieldToSelect.join(', ') : '*'
        let query = "SELECT ";


        if (this.selectedJoin != "") {

            this.fields.forEach(field => {

                query += this.table + "." + field.field

                if (this.fields[this.fields.length - 1].field != field.field) {
                    query += ",";
                }

            })

            query += this.selectedJoinField

            if (this.tableJoins.length > 0) {
                query += this.selectedJoinField
            }
            query += " FROM " + this.table + this.selectedJoin;
        }
        else {
            query = "SELECT " + allFields + " FROM " + this.table;
        }

        if (this.conditions) {
            query += this.conditions
        }
  
        this.fieldToSelect = []
        this.table = ""
        this.conditions = ""

        return query
    }
}

export default Query;