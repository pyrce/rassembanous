import ConfigServer from "./Core/services/Server";
import routerhandler from "./Core/Routes/Routes";



routerhandler.make();
ConfigServer.start()

