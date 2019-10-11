import { common, Config } from "./common";

export const config: Config = {
  ...common,
  hapi: {
    ...common.hapi,
    host: process.env.DOCKER_HOST_ADDR || "192.241.138.158",
    port: 3001,
  },
  mysql: {
    ...common.mysql,
    host: process.env.MYSQL_HOST || "",
    password: process.env.MYSQL_PASSWORD || "",
  },
};
