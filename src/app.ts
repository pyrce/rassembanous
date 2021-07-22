import ConfigServer from "./services/Server";
import routerhandler from "./routers/Routes";


routerhandler.make();
ConfigServer.start()

