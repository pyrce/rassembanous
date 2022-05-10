import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Events from "./Events"

@Table
class LieuModel extends Model {
    // table: string = 'lieu';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "nomLieu", type: TypeEnum.STRING },
    // ];
    
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number

    @Column
    nomLieu: string

    @Column
    adresse: string

    @HasMany(()=>Events)
    events: Events[]
}

// const eventUser = new LieuModel('lieu', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "nomLieu", type: TypeEnum.STRING },
// ]);

export default LieuModel;