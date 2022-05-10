import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany, BelongsTo } from 'sequelize-typescript'
import Events from "./Events"
@Table
class categories extends Model {
    // table: string = 'categories';
    // fields: Array<FieldsInterface> = [
    //     { field: "id", type: TypeEnum.NUMBER},
    //     { field: "categorie", type: TypeEnum.STRING },
    // ];

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number

      @Column
      categorie: string

      @HasMany(() => Events)
      events: Events[]
}

// const eventPartenaire = new CategoriesEventModel('categories', [
//     { field: "id", type: TypeEnum.NUMBER},
//     { field: "categorie", type: TypeEnum.STRING },
// ]);

export default categories;