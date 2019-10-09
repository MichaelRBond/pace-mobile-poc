import { Nullable } from "nullable-ts";
import { MySqlClient } from "../clients/mysql-client";
import { Communication, CommunicationBase } from "../models/communications-model";

export class CommunicationsDao {
  constructor(private mysqlProvider: () => MySqlClient) {}

  public async getCommunications(): Promise<Communication[]> {
    await this.mysqlProvider().query("SELECT * FROM `communications`");
    return [];
  }

  public async save(communication: CommunicationBase): Promise<number> {
    return 0;
  }

  public async getById(id: number): Promise<Nullable<Communication>> {
    return null;
  }
}
