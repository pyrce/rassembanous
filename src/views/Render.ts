import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";

class Render {


    file: String
    data: Object
    
    constructor(file:String,data:Object) {
  
        this.file=file;
        this.data=data;
    }

    public static make(file:String,data:Object): Render {

        return new Render(file,data);
    }

    public render(){
        const rootFolder = path.resolve('./');
        const templatePath = path.join(rootFolder, 'src', 'views', `${this.file}.ejs`);
        const values = this.data;
        const template = fs.readFileSync(templatePath, 'utf8');
        let rend = ejs.render(template, values);
        return rend;
    }

}

export default Render;