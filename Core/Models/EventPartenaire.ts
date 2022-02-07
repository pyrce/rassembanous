import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class EventPartenaire extends AbstractModel implements ModelInterface {
    table: string = 'event_partenaire';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "id_event", type: TypeEnum.NUMBER },
        { field: "id_user", type: TypeEnum.NUMBER },
    ];

}

const eventPartenaire = new EventPartenaire('event_partenaire', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "id_event", type: TypeEnum.NUMBER },
    { field: "id_user", type: TypeEnum.NUMBER },
]);

export default eventPartenaire;