import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class PartenaireUser extends AbstractModel implements ModelInterface {
    table: string = 'partenaire_user';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "id_user", type: TypeEnum.NUMBER },
        { field: "id_partenaire", type: TypeEnum.NUMBER },
    ];

}

const partenaireUser = new PartenaireUser('partenaire_user', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "id_user", type: TypeEnum.NUMBER },
    { field: "id_partenaire", type: TypeEnum.NUMBER },
]);

export default partenaireUser;