import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";
import { Table, Column, Model, DataType,HasMany,ForeignKey, BelongsTo } from 'sequelize-typescript'
import CategorieEvents from "./CategorieEvent";
import LieuModel from "./Lieu"
@Table({tableName:"evenements",modelName:"Events"})
class Events extends Model<Events>  {
  /*  table: string = 'evenements';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "nom", type: TypeEnum.STRING },
        { field: "description", type: TypeEnum.STRING },
        { field: "dateDebut", type: TypeEnum.DATETIME },
        { field: "dateFin", type: TypeEnum.DATETIME },
        { field: "dateLimit", type: TypeEnum.DATETIME },
        { field: "id_lieu", type: TypeEnum.NUMBER },
        { field: "id_categorie", type: TypeEnum.NUMBER },
        { field: "isPublic", type: TypeEnum.NUMBER },
        { field: "nbPlace", type: TypeEnum.NUMBER },
        { field: "prix", type: TypeEnum.NUMBER },
        { field: "affiche", type: TypeEnum.STRING },
    ];*/

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        field: 'id',
        primaryKey: true,
      })
      id: number
    @Column
    nom: string;

    @Column
    description: string;
    @Column
    dateDebut: TypeEnum.DATETIME;
    @Column
    dateFin: TypeEnum.DATETIME;
    @Column
    dateLimit: TypeEnum.DATETIME;
 
    @ForeignKey(() => LieuModel)
    @Column
    id_lieu: TypeEnum.DATETIME;

   @BelongsTo(()=>LieuModel,"id_lieu")
      lieu: LieuModel


    @ForeignKey(() => CategorieEvents)
    @Column
    id_categorie: TypeEnum.NUMBER;

        @BelongsTo(()=> CategorieEvents)
        catevent:CategorieEvents

    @Column
    isPublic: TypeEnum.NUMBER;
    @Column
    nbPlace: TypeEnum.NUMBER;
    @Column
    prix: TypeEnum.NUMBER;
    @Column
    affiche: TypeEnum.STRING;


}
/*
const eventsClass = new Events('evenements', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "nom", type: TypeEnum.STRING },
    { field: "description", type: TypeEnum.STRING },
    { field: "dateDebut", type: TypeEnum.DATETIME },
    { field: "dateFin", type: TypeEnum.DATETIME },
    { field: "dateLimit", type: TypeEnum.DATETIME },
    { field: "id_lieu", type: TypeEnum.NUMBER },
    { field: "id_categorie", type: TypeEnum.NUMBER },
    { field: "isPublic", type: TypeEnum.NUMBER },
    { field: "nbPlace", type: TypeEnum.NUMBER },
    { field: "prix", type: TypeEnum.NUMBER },
    { field: "affiche", type: TypeEnum.STRING },
]);*/

export default Events;