import { Nullable } from "nullable-ts";
import { MySqlClient } from "../clients/mysql-client";

export class RsvpDao {
  constructor(private mysqlProvider: () => MySqlClient) {}

  public async getCount(communicationId: number): Promise<Nullable<number>> {
    const mysql = this.mysqlProvider();
    const sql = "SELECT * FROM `rsvp` WHERE `communicationId`=?";
    const result = await mysql.query(sql, [communicationId]);
    if (result.length === 0) {
      return null;
    }
    return result[0].count;
  }

  public async save(communicationId: number, count: number): Promise<Nullable<number>> {
    const mysql = this.mysqlProvider();
    const sql = "INSERT INTO `rsvp` (`communicationId`, `count`) VALUES(?, ?)"
      + "ON DUPLICATE KEY UPDATE "
      + "`count` = VALUES(`count`), "
      + "`id`=LAST_INSERT_ID(`id`)";
    const result = await mysql.insertUpdate(sql, [communicationId, count]);

    // TODO: check result for errors
    return this.getCount(result.insertId);
  }
}
