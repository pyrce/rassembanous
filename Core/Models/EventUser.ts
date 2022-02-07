import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class EventUser extends AbstractModel implements ModelInterface {
    table: string = 'event_user';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "id_event", type: TypeEnum.NUMBER },
        { field: "id_user", type: TypeEnum.NUMBER },
    ];

}

const eventUser = new EventUser('event_user', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "id_event", type: TypeEnum.NUMBER },
    { field: "id_user", type: TypeEnum.NUMBER },
]);

export default eventUser;