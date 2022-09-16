import ConfigServer from "./Core/services/Server";
import routerhandler from "./Core/Routes/Routes";



routerhandler.make();
ConfigServer.start()

console.log("info usage mémoire : ") 
const used = process.memoryUsage().heapUsed / 1024 / 1024; console.log(`The script uses approximately ${used} MB`);