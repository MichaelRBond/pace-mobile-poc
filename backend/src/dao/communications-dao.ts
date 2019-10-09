import { MySqlClient } from "../clients/mysql-client";

export class CommunicationsDao {
  constructor(private mysqlProvider: () => MySqlClient) {}
}
