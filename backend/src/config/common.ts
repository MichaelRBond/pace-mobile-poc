import {ConnectionConfig} from "mysql";

interface LoggerConfig {
  colorize: boolean;
  json: boolean;
  level: string;
  silent: boolean;
}

export interface Config {
  appName: string;
  hapi: {
    host: string;
    port: number;
  };
  logger: LoggerConfig;
  mysql: ConnectionConfig;
  onesignal: {
    apiKey: string;
    appId: string;
    endpoint: string;
  };
}

export const common: Config = {
  appName: "Pace Communications Mobile App Backend",
  hapi: {
    host: "0.0.0.0",
    port: 3000,
  },
  logger: {
    colorize: true,
    json: false,
    level: "debug",
    silent: false,
  },
  mysql: {
    database: "pace_mobile",
    host: "127.0.0.1",
    port: 3306,
    user: "pace",
  },
  onesignal: {
    apiKey: process.env.ONESIGNAL_APIKEY || "",
    appId: process.env.ONESIGNAL_APPID || "",
    endpoint: "https://onesignal.com",
  },
};
