import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, HasMany, BelongsTo } from 'sequelize-typescript'
import Users from "./UsersModel"
@Table
class Roles extends Model  {
    // table: string = 'roles';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "role", type: TypeEnum.NUMBER },
    // ];

    @Column
    role: string

    @HasMany(() => Users)
    users: Users[]
}

// const roles = new RolesModel('roles', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "role", type: TypeEnum.NUMBER },
// ]);

export default Roles;