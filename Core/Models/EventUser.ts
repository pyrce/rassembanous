import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Events from "./Events"
import Users from "./UsersModel";
@Table({tableName:"event_user"})
class EventUser extends Model {
    // table: string = 'event_user';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "id_event", type: TypeEnum.NUMBER },
    //     { field: "id_user", type: TypeEnum.NUMBER },
    // ];

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number

      @BelongsTo(()=>Events)
      @Column
      id_event: number

      @BelongsTo(()=>Users)
      @Column
      id_user: number

}

// const eventUser = new EventUser('event_user', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "id_event", type: TypeEnum.NUMBER },
//     { field: "id_user", type: TypeEnum.NUMBER },
// ]);

export default EventUser;