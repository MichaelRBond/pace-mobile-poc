import { CommunicationsDao } from "../dao/communications-dao";

export class CommunicationsModel {
  constructor(private communicationsDao: CommunicationsDao) {
  }

  // TODO: Remove me
  public noop(): string {
    return this.communicationsDao.noop();
  }
}
