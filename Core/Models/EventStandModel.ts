import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Stands from "./StandModel"
import Users from "./UsersModel"
import Events from "./Events"

@Table({tableName:"event_stand"})
class EventStandModel extends Model{
    // table: string = 'event_stand';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "id_event", type: TypeEnum.NUMBER },
    //     { field: "id_stand", type: TypeEnum.NUMBER },
    //     { field: "id_partenaire", type: TypeEnum.NUMBER },
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

      @BelongsTo(()=>Stands)
      @Column
      id_stand: number

      @BelongsTo(()=>Users)
      @Column
      id_partenaire: number


}

// const eventUser = new EventStandModel('event_stand', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "id_event", type: TypeEnum.NUMBER },
//     { field: "id_stand", type: TypeEnum.NUMBER },
//     { field: "id_partenaire", type: TypeEnum.NUMBER },
// ]);

export default EventStandModel;