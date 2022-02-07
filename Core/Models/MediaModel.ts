import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class MediaModel extends AbstractModel implements ModelInterface {
    table: string = 'media';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "nom", type: TypeEnum.STRING },
        { field: "id_event", type: TypeEnum.NUMBER },
        { field: "id_user", type: TypeEnum.NUMBER },
        { field: "id_type", type: TypeEnum.NUMBER },
    ];

}

const mediaModel = new MediaModel('media', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "nom", type: TypeEnum.STRING },
    { field: "id_event", type: TypeEnum.NUMBER },
    { field: "id_user", type: TypeEnum.NUMBER },
    { field: "id_type", type: TypeEnum.NUMBER },
]);

export default mediaModel;