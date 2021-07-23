interface FieldsInterface {
    field :String;
    type :string;

} 
function getField(model:FieldsInterface){
    return model.field
} 

function getType(model:FieldsInterface){
    return model.type
} 
export default FieldsInterface;