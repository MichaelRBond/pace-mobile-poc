import { isNullOrUndefined, Nullable, orElseThrow } from "nullable-ts";
import { OneSignalClient } from "../clients/onesignal";
import { CommunicationsDao } from "../dao/communications";
import { logger } from "../utils/logger";

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

export interface CommunicationGetResponse {
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
  constructor(private communicationsDao: CommunicationsDao, private onesignal: OneSignalClient) {}

  public static toApiResponse(communication: Communication): CommunicationGetResponse {
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

  public async getCommunication(id: number): Promise<Nullable<Communication>> {
    return await this.communicationsDao.getById(id);
  }

  public async getCommunications(): Promise<Communication[]> {
    return await this.communicationsDao.getCommunications();
  }

  public async saveCommunication(communicationBase: CommunicationBase): Promise<Communication> {
    const communicationNullable = await this.communicationsDao.save(communicationBase);
    const communication = orElseThrow(communicationNullable, new Error("Error saving communication"));
    try {
      await this.onesignal.createNotification("You have a new message from Pace");
    } catch (err) {
      logger.error(`Error sending push notification`);
    }
    return communication;
  }

  public async deleteCommunication(id: number): Promise<void> {
    await this.communicationsDao.delete(id);
    return;
  }
}
