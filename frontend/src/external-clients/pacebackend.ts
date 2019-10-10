import config from "../config/index";
import { HttpClient, HttpRequestConfig } from "../utils/http";

interface VerifyAuthenticationResponse {
  verification: boolean;
}

export interface TaggedCommunication extends Communication {
  id: string;
}

export interface Communication {
  subject: string;
  body: string;
}

export class PaceBackendClient {

  private static AUTH_URL: string = "/api/v1/account/verify";
  private static COMMUNICATIONS_URL: string = "api/v1/communications";

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

  public async postCommunication(data: Communication): Promise<void> {
    const url = `${this.endpoint}${PaceBackendClient.COMMUNICATIONS_URL}`;
    const requestParams: HttpRequestConfig = {
      password: this.password,
      url,
      username: this.username,
    };
    // TODO: Any response?
    const response = await this.httpClient.post<Communication, void>(data, requestParams);
    if (response.status !== 200) {
      throw new Error(`Failed to post communication`);
    }
  }

  public async deleteCommunication(data: Communication): Promise<void> {
    const url = `${this.endpoint}${PaceBackendClient.COMMUNICATIONS_URL}`;
    const requestParams: HttpRequestConfig = {
      password: this.password,
      url,
      username: this.username,
    };
    // TODO: Any response? All of this really.
    const response = await this.httpClient.delete<Communication, void>(requestParams, data);
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
