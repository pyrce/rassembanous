import Database from "./Database";

class Query {
    table: String;

    constructor(table: String) {
        this.table = table;
    }

    async findAll() {

        const requestData = await Database.query(`SELECT * FROM ${this.table}`, [])
        return requestData;

    }

    async findById(id: Number) {

        const requestData = await Database.query(`SELECT * FROM ${this.table} where id = ?`, [id])
        return requestData;

    }
}

export default Query;