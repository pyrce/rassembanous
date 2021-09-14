import FieldsInterface from "../../Core/Interface/FieldsInterface";
import ModelInterface from "../../Core/Interface/ModelInterface";
import AbstractModel from "./../../Core/Model/AbstractModel";
import TypeEnum from "./../../Core/Model/TypeEnum";

class Article extends AbstractModel implements ModelInterface {
    table: string = 'articles';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "titre", type: TypeEnum.STRING },
        { field: "auteur", type: TypeEnum.STRING },
        { field: "contenu", type: TypeEnum.STRING },
    ];

}

const articleClass = new Article('articles', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "titre", type: TypeEnum.STRING },
    { field: "auteur", type: TypeEnum.STRING },
    { field: "contenu", type: TypeEnum.STRING },
]);

export default articleClass;