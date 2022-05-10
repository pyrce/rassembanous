import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'

@Table
class Stands extends Model{
    // table: string = 'stands';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "nomStand", type: TypeEnum.STRING },
    // ];

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number

    @Column
    nomStand: string

}

// const eventUser = new StandModel('stands', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "nomStand", type: TypeEnum.STRING },
// ]);

export default Stands;