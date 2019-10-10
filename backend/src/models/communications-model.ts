import { isNullOrUndefined, orElseThrow } from "nullable-ts";
import { CommunicationsDao } from "../dao/communications-dao";

export enum CommunicationUrgency {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

export interface CommunicationBase {
  body: string;
  event?: {
    endDate: number;
    startDate: number;
  };
  expirationDate: number;
  subject: string;
  urgency?: CommunicationUrgency;
}

export interface Communication extends CommunicationBase {
  id: number;
  createdDate: number;
}

export interface CommunicationsGetResponse {
  body: string;
  created_date: number;
  event?: {
    end_date: number;
    start_date: number;
  };
  expiration_date: number;
  id: number;
  subject: string;
}

export class CommunicationsModel {
  constructor(private communicationsDao: CommunicationsDao) {
  }

  public static toApiResponse(communication: Communication): CommunicationsGetResponse {
    return {
      body: communication.body,
      created_date: communication.createdDate,
      event: isNullOrUndefined(communication.event) ? undefined : {
        end_date: communication.event.endDate,
        start_date: communication.event.startDate,
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
