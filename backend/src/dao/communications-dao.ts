import { isNullOrUndefined, Nullable } from "nullable-ts";
import { MySqlClient } from "../clients/mysql-client";
import { Communication, CommunicationBase } from "../models/communications-model";
import { DateTime } from "../utils/date-time";

export class CommunicationsDao {
  constructor(private mysqlProvider: () => MySqlClient, private dateTime: DateTime) {}

  public async getById(id: number): Promise<Nullable<Communication>> {
    const mysql = this.mysqlProvider();
    const sql = "SELECT * FROM `communications` WHERE `id`=?";
    const result = await mysql.query(sql, [id]);
    if (result.length === 0) {
      return null;
    }
    return this.dbToCommunication(result[0]);
  }

  public async getCommunications(): Promise<Communication[]> {
    const mysql = this.mysqlProvider();
    const sql = "SELECT * FROM `communications` WHERE `expirationDate`>?";
    const now = this.dateTime.dateNoWInSeconds();
    const result = await mysql.query(sql, [now]);
    return result.map(this.dbToCommunication);
  }

  public async save(communication: CommunicationBase): Promise<Nullable<Communication>> {
    const mysql = this.mysqlProvider();
    const sql = "INSERT INTO `communications` (`body`, `subject`, `createdDate`, `expirationDate`, `startDate`, "
    + "`endDate`, `urgency`) "
    + "VALUES(?, ?, ?, ?, ?, ?, ?)";

    const createdDate = this.dateTime.dateNoWInSeconds();
    const startDate = communication.event && communication.event.startDate || null;
    const endDate = communication.event && communication.event.endDate || null;
    const urgency = communication.urgency || null;

    const result = await mysql.insertUpdate(sql, [communication.body, communication.subject, createdDate,
      communication.expirationDate, startDate, endDate, urgency]);

    // TODO : check for error in result. Throw new error

    return this.getById(result.insertId);
  }

  public async delete(id: number): Promise<void> {
    const mysql = this.mysqlProvider();
    const sql = "DELETE FROM `communications` WHERE `id`=?";
    await mysql.query(sql, [id]);
  }

  private dbToCommunication(result: any): Communication {
    return {
      body: result.body,
      createdDate: result.createdDate,
      event: isNullOrUndefined(result.startDate) && isNullOrUndefined(result.endDate) ? undefined : {
        endDate: result.endDate,
        startDate: result.startDate,
      },
      expirationDate: result.expirationDate,
      id: result.id,
      subject: result.subject,
      urgency: result.urgency,
    };
  }
}
