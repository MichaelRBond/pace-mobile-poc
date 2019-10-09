import { ServerRoute } from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import { EndpointController } from "../models/endpoint-controller";

interface RssVerifyAuthResponse {
  verification: boolean;
}

const joiResponse = Joi.object({
  verification: Joi.boolean(),
});

export class VerifyAuthController extends EndpointController {

  public async verify(): Promise<RssVerifyAuthResponse> {
    return {verification: true};
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "GET",
        options: {
          handler: this.verify,
          response: {
            schema: joiResponse,
          },
        },
        path: "/api/v1/account/verify",
      },
    ];
  }
}
