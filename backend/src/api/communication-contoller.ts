import * as Boom from "@hapi/boom";
import { Request, ServerRoute } from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import { orElseThrow } from "nullable-ts";
import { CommunicationBase, CommunicationsGetResponse, CommunicationsModel } from "../models/communications-model";
import { EndpointController } from "../models/endpoint-controller";
import { thrownErrMsg } from "../utils/errors";

const joiCommunicationsGetResponse = Joi.object({
  body: Joi.string(),
  created_date: Joi.number(),
  event: Joi.object({
    end_time: Joi.number(),
    start_time: Joi.number(),
  }).optional(),
  expiration_date: Joi.number(),
  id: Joi.number(),
  subject: Joi.string(),
});

export class CommunicationsController extends EndpointController {

  constructor(private communicationsModel: CommunicationsModel) {
    super();
    this.getCommunications = this.getCommunications.bind(this);
  }

  public async getCommunications(request: Request): Promise<CommunicationsGetResponse[]> {
    return [];
  }

  public async saveCommunication(request: Request): Promise<CommunicationsGetResponse> {
    const communicationPayload = request.payload as CommunicationBase;
    const communicationNullable = await this.communicationsModel.saveCommunication(communicationPayload);
    const communication = orElseThrow(communicationNullable, Boom.internal(thrownErrMsg.communicationSaveError));
    return CommunicationsModel.toApiResponse(communication);
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "GET",
        options: {
          handler: this.getCommunications,
          response: {
            schema: joiCommunicationsGetResponse,
          },
        },
        path: "/api/v1/communications",
      },
      {
        method: "POST",
        options: {
          handler: this.saveCommunication,
          response: {
            schema: joiCommunicationsGetResponse,
          },
        },
        path: "/api/v1/communications",
      },
    ];
  }
}
