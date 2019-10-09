import { Request, ServerRoute } from "@hapi/hapi";
// import * as Joi from "@hapi/joi";
import { CommunicationsModel } from "../models/communications-model";
import { EndpointController } from "../models/endpoint-controller";

interface GetCommunicationsResponse {
  message: string;
}

export class CommunicationsController extends EndpointController {

  constructor(private communicationsModel: CommunicationsModel) {
    super();
    this.getCommunications = this.getCommunications.bind(this);
  }

  public async getCommunications(request: Request): Promise<GetCommunicationsResponse> {
    // TODO: Fix me
    this.communicationsModel.noop();
    return {message: "hello world!"};
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "GET",
        options: {
          handler: this.getCommunications,
        },
        path: "/api/v1/communications",
      },
    ];
  }
}
