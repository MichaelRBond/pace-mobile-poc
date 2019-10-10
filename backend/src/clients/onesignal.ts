import { AxiosRequestConfig } from "axios";
import { isBlank } from "../utils/helpers";
import { Http, HttpMethods } from "../utils/http";
import { logger } from "../utils/logger";

export class OneSignalClient {

  private static CREATE_NOTIFICATION_URL = "api/v1/notifications";

  constructor(
    private http: Http,
    private endpoint: string,
    private apikey: string,
    private appId: string,
  ) {}

  public async createNotification(message: string): Promise<void> {

    if (isBlank(this.apikey) || isBlank(this.appId)) {
      logger.debug("Not sending push notification because secrets are empty");
      return;
    }

    const pushNotification = {
      app_id: this.appId,
      contents: {
        en: message,
      },
      included_segments: ["Subscribed Users"],
    };
    const requestConfig: AxiosRequestConfig = {
      data: pushNotification,
      headers: {
        Authorization: `Basic ${this.apikey}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      method: HttpMethods.post,
      url: `${this.endpoint}/${OneSignalClient.CREATE_NOTIFICATION_URL}`,
    };

    const result = await this.http.request(requestConfig);
    if (result.status !== 200) {
      logger.error(`Error sending push notification: ${JSON.stringify(pushNotification)}`, {
        data: result.data,
        status: result.status,
      });
      throw new Error(`Error sending push notification`);
    }
    return;
  }
}
