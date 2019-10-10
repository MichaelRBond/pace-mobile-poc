import { orElse } from "nullable-ts";
import { RsvpDao } from "../dao/rsvp";

export interface RsvpResponse {
  count: number;
  id: number;
}

export class RsvpModel {
  constructor(private rsvpDao: RsvpDao) {}

  public async getCount(communicationId: number): Promise<number> {
    const countNullable = await this.rsvpDao.getCount(communicationId);
    return orElse(countNullable, 0);
  }

  public async save(communicationId: number): Promise<number> {
    const currentRsvpCount = await this.getCount(communicationId);
    const newCount = currentRsvpCount + 1;
    await this.rsvpDao.save(communicationId, newCount);
    return newCount;
  }

  public async deleteRsvp(communicationId: number): Promise<number> {
    const currentRsvpCount = await this.getCount(communicationId);
    const newCount = currentRsvpCount >= 1 ? currentRsvpCount - 1 : 0;
    await this.rsvpDao.save(communicationId, newCount);
    return newCount;
  }
}
