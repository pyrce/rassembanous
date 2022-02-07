import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class Events extends AbstractModel implements ModelInterface {
    table: string = 'evenements';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "nom", type: TypeEnum.STRING },
        { field: "description", type: TypeEnum.STRING },
        { field: "dateDebut", type: TypeEnum.DATETIME },
        { field: "dateFin", type: TypeEnum.DATETIME },
        { field: "dateLimit", type: TypeEnum.DATETIME },
        { field: "lieu", type: TypeEnum.STRING },
        { field: "categorie", type: TypeEnum.STRING },
        { field: "isPublic", type: TypeEnum.NUMBER },
        { field: "nbPlace", type: TypeEnum.NUMBER },
        { field: "prix", type: TypeEnum.NUMBER },
        { field: "affiche", type: TypeEnum.STRING },
    ];

}

const eventsClass = new Events('evenements', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "nom", type: TypeEnum.STRING },
    { field: "description", type: TypeEnum.STRING },
    { field: "dateDebut", type: TypeEnum.DATETIME },
    { field: "dateFin", type: TypeEnum.DATETIME },
    { field: "dateLimit", type: TypeEnum.DATETIME },
    { field: "lieu", type: TypeEnum.STRING },
    { field: "categorie", type: TypeEnum.STRING },
    { field: "isPublic", type: TypeEnum.NUMBER },
    { field: "nbPlace", type: TypeEnum.NUMBER },
    { field: "prix", type: TypeEnum.NUMBER },
    { field: "affiche", type: TypeEnum.STRING },
]);

export default eventsClass;