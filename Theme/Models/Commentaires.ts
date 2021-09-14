import FieldsInterface from "../../Core/Interface/FieldsInterface";
import ModelInterface from "../../Core/Interface/ModelInterface";
import AbstractModel from "./../../Core/Model/AbstractModel";
import TypeEnum from "./../../Core/Model/TypeEnum";

class Commentaires extends AbstractModel implements ModelInterface {
    table: string = 'commentaires';


    fields: Array<FieldsInterface> = [
        { field: "id", type: TypeEnum.NUMBER},
        { field: "auteur", type: TypeEnum.STRING },
        { field: "commentaire", type: TypeEnum.STRING },
        { field: "id_article", type: TypeEnum.NUMBER}
    ];
}

const commentaireClass = new Commentaires('commentaires', [
    { field: "id", type: TypeEnum.NUMBER},
    { field: "auteur", type: TypeEnum.STRING },
    { field: "commentaire", type: TypeEnum.STRING },
    { field: "id_article", type: TypeEnum.NUMBER }
]);

export default commentaireClass;