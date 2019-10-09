import { MySqlClient } from "../clients/mysql-client";

export class CommunicationsDao {
  constructor(private mysqlProvider: () => MySqlClient) {}

  // TODO: Type return better
  public async getCommunications(): Promise<any> {
    await this.mysqlProvider().query("SELECT * FROM `something`");
  }

  // TODO: Remove me
  public noop(): string {
    return "no-op";
  }
}
