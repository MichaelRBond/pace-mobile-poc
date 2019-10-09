import { isNullOrUndefined, orElseThrow } from "nullable-ts";
import { CommunicationsDao } from "../dao/communications-dao";

export interface CommunicationBase {
  body: string;
  event?: {
    endTime: number;
    startTime: number;
  };
  expirationDate: number;
  subject: string;
}

export interface CommunicationsGetResponse {
  body: string;
  created_date: number;
  event?: {
    end_time: number;
    start_time: number;
  };
  expiration_date: number;
  id: number;
  subject: string;
}

export interface Communication extends CommunicationBase {
  id: number;
  createdDate: number;
}

export class CommunicationsModel {
  constructor(private communicationsDao: CommunicationsDao) {
  }

  public static toApiResponse(communication: Communication): CommunicationsGetResponse {
    return {
      body: communication.body,
      created_date: communication.createdDate,
      event: isNullOrUndefined(communication.event) ? undefined : {
        end_time: communication.event.endTime,
        start_time: communication.event.startTime,
      },
      expiration_date: communication.expirationDate,
      id: communication.id,
      subject: communication.subject,
    };
  }

  public async saveCommunication(communication: CommunicationBase) {
    const communicationIdNullable = await this.communicationsDao.save(communication);
    if (isNullOrUndefined(communicationIdNullable)) {
      return null;
    }
    const communicationId = orElseThrow(communicationIdNullable, new Error("Error saving communication"));
    return this.communicationsDao.getById(communicationId);
  }
}
