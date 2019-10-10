import config from "../config/index";
import { HttpClient, HttpRequestConfig } from "../utils/http";

interface VerifyAuthenticationResponse {
  verification: boolean;
}

export interface TaggedCommunication extends Communication {
  id: number;
}

export interface Communication {
  body: string;
  event?: {
    end_date: number;
    start_date: number;
  };
  expiration_date: number;
  subject: string;
}

export interface CommunicationPostMessage {
  body: string;
  event?: {
    endDate: number;
    startDate: number;
  };
  expirationDate: number;
  subject: string;
}

export class PaceBackendClient {

  private static AUTH_URL: string = "/api/v1/account/verify";
  private static COMMUNICATIONS_URL: string = "/api/v1/communications";

  private username: string;
  private password: string;

  constructor(
    private httpClient: HttpClient,
    private endpoint: string = config.pacebackendHost,
  ) { /* */ }

  public async authenticate(username: string, password: string): Promise<boolean> {
    const url = `${this.endpoint}${PaceBackendClient.AUTH_URL}`;
    const requestParams: HttpRequestConfig = {
      password,
      url,
      username,
    };
    const response = await this.httpClient.get<VerifyAuthenticationResponse>(requestParams);
    if (response.status === 200 && response.data.verification === true) {
      this.initializeCredentials(username, password);
      return true;
    }
    return false;
  }

  public async getCommunications(): Promise<TaggedCommunication[]> {
    const url = `${this.endpoint}${PaceBackendClient.COMMUNICATIONS_URL}`;
    const requestParams: HttpRequestConfig = {
      password: this.password,
      url,
      username: this.username,
    };
    const response = await this.httpClient.get<TaggedCommunication[]>(requestParams);
    if (response.status !== 200) {
      throw new Error(`Failed to get communications`);
    }
    return response.data;
  }

  public async postCommunication(data: Communication): Promise<TaggedCommunication> {
    const url = `${this.endpoint}${PaceBackendClient.COMMUNICATIONS_URL}`;
    const requestParams: HttpRequestConfig = {
      password: this.password,
      url,
      username: this.username,
    };
    const response = await this.httpClient.post<CommunicationPostMessage, TaggedCommunication>({
      body: data.body,
      event: data.event == null ? undefined : {
        endDate: data.event.end_date,
        startDate: data.event.start_date,
      },
      expirationDate: data.expiration_date,
      subject: data.subject,
    }, requestParams);
    if (response.status !== 200) {
      throw new Error(`Failed to post communication`);
    }
    return response.data;
  }

  public async deleteCommunication(id: number): Promise<void> {
    const url = `${this.endpoint}${PaceBackendClient.COMMUNICATIONS_URL}/${id}`;
    const requestParams: HttpRequestConfig = {
      password: this.password,
      url,
      username: this.username,
    };
    const response = await this.httpClient.delete<Communication, void>(requestParams);
    if (response.status !== 200) {
      throw new Error(`Failed to delete communication`);
    }
  }

  private initializeCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
    return;
  }

}
