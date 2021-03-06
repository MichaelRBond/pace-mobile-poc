import { Server } from "@hapi/hapi";
import { CommunicationsController } from "./api/communication-contoller";
import { RsvpController } from "./api/rsvp-controller";
import { VerifyAuthController } from "./api/verify-auth";
import { mysqlClientProvider } from "./clients/mysql-client";
import { OneSignalClient } from "./clients/onesignal";
import { config } from "./config";
import { AccountDao } from "./dao/accounts";
import { CommunicationsDao } from "./dao/communications";
import { RsvpDao } from "./dao/rsvp";
import { AccountModel } from "./models/accounts";
import { CommunicationsModel } from "./models/communications";
import { EndpointController } from "./models/endpoint-controller";
import { RsvpModel } from "./models/rsvp";
import { Authentication } from "./utils/authentication";
import { DateTime } from "./utils/date-time";
import { Http } from "./utils/http";
import { logger } from "./utils/logger";

const datetime = new DateTime();
const http = new Http();

const accountDao = new AccountDao(mysqlClientProvider);
const communicationsDao = new CommunicationsDao(mysqlClientProvider, datetime);
const rsvpDao = new RsvpDao(mysqlClientProvider);

const onesignal = new OneSignalClient(http, config.onesignal.endpoint, config.onesignal.apiKey, config.onesignal.appId);

const accountModel = new AccountModel(accountDao);
const communicationsModel = new CommunicationsModel(communicationsDao, onesignal);
const rsvpModel = new RsvpModel(rsvpDao);

const authentication = new Authentication(accountModel);

const communicationsController = new CommunicationsController(communicationsModel);
const rsvpController = new RsvpController(rsvpModel);
const verifyAuthController = new VerifyAuthController();

const endpointControllers: EndpointController[] = [
  communicationsController,
  rsvpController,
  verifyAuthController,
];

getHapiServer(authentication, endpointControllers).then((server) => {
  server.start();
  return server;
}).then((server) => {
  logger.info(`Hapi Running at: ${server.info.uri}`);
}).catch((err) => {
  throw err;
});

async function getHapiServer(
  auth: Authentication,
  controllers: EndpointController[],
): Promise<Server> {
  const server = new Server({
    host: config.hapi.host,
    port: config.hapi.port,
    routes: {
      cors: true,
    },
  });

  await server.register(require("@hapi/basic"));
  auth.registerAuthStrategies(server);

  controllers.forEach((c) => {
    server.route(c.registerRoutes());
  });

  await server.initialize();

  return server;
}
