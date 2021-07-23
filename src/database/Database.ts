/**
 * class qui initialise la connexion et qui execute la query envoyer par la clas Query
 */

import * as process from "process";
import mysql from 'mysql2';
import * as dotenv from "dotenv";
dotenv.config();
class Database {

    private static _instance: Database;

    // private maRoute : Route;
    // connexion: Object;
    constructor() {

        //this.connexion= createConnection("mysql://root:root@127.0.0.1:3306/mycms");

    }

    public static connect() {
        return mysql.createConnection({
            database: "mycms",
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root"
        });
    }

    public static query(query: string, params: any) {

        const db = this.connect();
        return new Promise(function (resolve, reject) {
            db.query(query, params, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                let data = Database.sanitizeData(rows, fields);

                // return data
                return resolve(data);
            });
        })
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

export default Database