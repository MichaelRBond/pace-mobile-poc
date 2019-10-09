import { Request, ServerRoute } from "hapi";
import * as Joi from "joi";
import { CommunicationsModel } from "../models/communications-model";
import { EndpointController } from "../models/endpoint-controller";

interface GetCommunicationsResponse {
  message: string;
}

const JoiGetCommunicationsResponse = {
  message: Joi.string(),
};

export class CommunicationsController extends EndpointController {

  constructor(private communicationsModel: CommunicationsModel) {
    super();
    this.getCommunications = this.getCommunications.bind(this);
  }

  public async getCommunications(request: Request): Promise<GetCommunicationsResponse> {
    return {message: "hello world!"};
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "GET",
        options: {
          handler: this.getCommunications,
          response: {
            schema: JoiGetCommunicationsResponse,
          },
        },
        path: "/api/v1/feed",
      },
    ];
  }
}
