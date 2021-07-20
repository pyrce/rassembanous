import ConfigServer from "./services/ConfigServer";
import routerhandler from "./routers/Routes";


routerhandler.make();
ConfigServer.start()

