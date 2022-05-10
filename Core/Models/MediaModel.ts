import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Events from "./Events"
import Users from "./UsersModel";
@Table({tableName:"media",modelName:"MediaModel"})
class MediaModel extends Model {
    // table: string = 'media';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "image", type: TypeEnum.STRING },
    //     { field: "id_event", type: TypeEnum.NUMBER },
    //     { field: "id_user", type: TypeEnum.NUMBER },
    //     { field: "id_type", type: TypeEnum.NUMBER },
    // ];
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number

      @Column
      image: string

      @BelongsTo(()=>Events)
      @Column
      id_event: number

      @BelongsTo(()=>Users)
      @Column
      id_user: number
      
      @Column
      id_type: number
}

// const mediaModel = new MediaModel('media', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "image", type: TypeEnum.STRING },
//     { field: "id_event", type: TypeEnum.NUMBER },
//     { field: "id_user", type: TypeEnum.NUMBER },
//     { field: "id_type", type: TypeEnum.NUMBER },
// ]);

export default MediaModel;