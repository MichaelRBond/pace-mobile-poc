import { Server } from "hapi";
import { CommunicationsController } from "./api/communication-contoller";
import { mysqlClientProvider } from "./clients/mysql-client";
import { config } from "./config";
import { CommunicationsDao } from "./dao/communications-dao";
import { CommunicationsModel } from "./models/communications-model";
import { EndpointController } from "./models/endpoint-controller";
import { DateTime } from "./utils/date-time";
import { Http } from "./utils/http";
import { logger } from "./utils/logger";

const datetime = new DateTime();
const http = new Http();

const communicationsDao = new CommunicationsDao(mysqlClientProvider);
const communicationsModel = new CommunicationsModel(communicationsDao);

// const authentication = new Authentication(accountModel);

const communicationsController: CommunicationsController = new CommunicationsController(communicationsModel);

const endpointControllers: EndpointController[] = [
  communicationsController,
];

getHapiServer(endpointControllers).then((server) => {
  server.start();
  return server;
}).then((server) => {
  // logger.info(`Hapi Running at: ${server.info.uri}`);
}).catch((err) => {
  throw err;
});

async function getHapiServer(
  // auth: Authentication,
  controllers: EndpointController[],
): Promise<Server> {
  const server = new Server({
    host: config.hapi.host,
    port: config.hapi.port,
    routes: {
      cors: true,
    },
  });

  // await server.register(require("hapi-auth-basic"));
  // auth.registerAuthStrategies(server);

  controllers.forEach((c) => {
    server.route(c.registerRoutes());
  });

  await server.initialize();

  return server;
}
