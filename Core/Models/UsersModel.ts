import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, HasMany, BelongsTo } from 'sequelize-typescript'
import RolesModel from "./RolesModel";
@Table
class Users extends Model  {
    // table: string = 'users';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "nom", type: TypeEnum.STRING },
    //     { field: "prenom", type: TypeEnum.STRING },
    //     { field: "login", type: TypeEnum.STRING },
    //     { field: "password", type: TypeEnum.STRING },
    //     { field: "avatar", type: TypeEnum.STRING },
    //     { field: "email", type: TypeEnum.STRING },
    //     { field: "id_role", type: TypeEnum.NUMBER },
    //     { field: "adresse", type: TypeEnum.STRING },
    //     { field: "token", type: TypeEnum.STRING },
    // ];
   @Column
    nom: string

    @Column
    prenom: string

    @Column
    login: string

    @Column
    password: string

    @Column
    avatar: string

    @BelongsTo(() => RolesModel)
    @Column
    email: string

    @Column
    id_role: number

    @Column
    adresse: string

    @Column 
    token:string

}

export default Users;