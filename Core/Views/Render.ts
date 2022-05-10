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
        let templatePath = path.join(rootFolder, 'Theme', 'views', `${this.file}.ejs`);
   let fileExist= fs.existsSync(templatePath);

   if(!fileExist){
    templatePath=  path.join(rootFolder, 'Core', 'views', `${this.file}.ejs`);
   }
        const values = this.data;

   const template = fs.readFileSync(templatePath, 'utf8');

        let rend = ejs.render(template, values);
        return rend;
    }

}

export default Render;