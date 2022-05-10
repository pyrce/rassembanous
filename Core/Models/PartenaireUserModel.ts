import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Users from "./UsersModel"
@Table({tableName:"partenaire_user",modelName:"PartenaireUser"})
class PartenaireUser extends Model {
    // table: string = 'partenaire_user';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "id_user", type: TypeEnum.NUMBER },
    //     { field: "id_partenaire", type: TypeEnum.NUMBER },
    // ];

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number 

      @BelongsTo(()=>Users)
      @Column
      id_user: number

      @BelongsTo(()=>Users)
      @Column
      id_partenaire: number
}

// const partenaireUser = new PartenaireUser('partenaire_user', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "id_user", type: TypeEnum.NUMBER },
//     { field: "id_partenaire", type: TypeEnum.NUMBER },
// ]);

export default PartenaireUser;