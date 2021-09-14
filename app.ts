import ConfigServer from "./Core/services/Server";
import routerhandler from "./Theme/Route/Routes";


routerhandler.make();
ConfigServer.start()

