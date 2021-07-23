import FieldsInterface from "../routers/FieldsInterface";
import ModelInterface from "../routers/ModelInterface";
import AbstractModel from "./AbstractModel";
import TypeEnum from "./TypeEnum";

class Article extends AbstractModel implements ModelInterface {
    table: string = 'articles';
    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "titre", type: TypeEnum.STRING },
        { field: "auteur", type: TypeEnum.STRING },
        { field: "contenu", type: TypeEnum.STRING },
    ];

}

const article = new Article('articles', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "titre", type: TypeEnum.STRING },
    { field: "auteur", type: TypeEnum.STRING },
    { field: "contenu", type: TypeEnum.STRING },
]);

export default article;