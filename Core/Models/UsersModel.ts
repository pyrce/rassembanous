import FieldsInterface from "../Interface/FieldsInterface";
import ModelInterface from "../Interface/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class UsersModel extends AbstractModel implements ModelInterface {
    table: string = 'users';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "nom", type: TypeEnum.STRING },
        { field: "prenom", type: TypeEnum.STRING },
        { field: "login", type: TypeEnum.STRING },
        { field: "password", type: TypeEnum.STRING },
        { field: "avatar", type: TypeEnum.STRING },
        { field: "email", type: TypeEnum.STRING },
        { field: "id_role", type: TypeEnum.NUMBER },
        { field: "adresse", type: TypeEnum.STRING },
    ];

}

const partenaireModel = new UsersModel('users', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "nom", type: TypeEnum.STRING },
    { field: "prenom", type: TypeEnum.STRING },
    { field: "nomMoral", type: TypeEnum.STRING },
    { field: "login", type: TypeEnum.STRING },
    { field: "password", type: TypeEnum.STRING },
    { field: "avatar", type: TypeEnum.STRING },
    { field: "email", type: TypeEnum.STRING },
    { field: "id_role", type: TypeEnum.NUMBER },
    { field: "adresse", type: TypeEnum.STRING },
]);

export default partenaireModel;