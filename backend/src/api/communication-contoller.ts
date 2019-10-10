import * as Boom from "@hapi/boom";
import { Request, ServerRoute } from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import { orElseThrow } from "nullable-ts";
import { ApiMessageResponse, joiApiMessageResponse } from "../models/api";
import { CommunicationBase, CommunicationGetResponse, CommunicationsModel } from "../models/communications";
import { EndpointController } from "../models/endpoint-controller";
import { thrownErrMsg, transformErrors } from "../utils/errors";
import { logger } from "../utils/logger";

const joiCommunicationGetResponse = Joi.object({
  body: Joi.string(),
  created_date: Joi.number(),
  event: Joi.object({
    end_date: Joi.number(),
    start_date: Joi.number(),
  }).optional(),
  expiration_date: Joi.number(),
  id: Joi.number(),
  subject: Joi.string(),
  urgency: Joi.number().optional(),
});

const joiCommunicationPayload = Joi.object({
  body: Joi.string(),
  event: Joi.object({
    endDate: Joi.number(),
    startDate: Joi.number(),
  }).optional(),
  expirationDate: Joi.number(),
  subject: Joi.string(),
  urgency: Joi.number().optional(),
});

const joiCommunicationsGetResponse = Joi.array().items(joiCommunicationGetResponse);

export class CommunicationsController extends EndpointController {

  constructor(private communicationsModel: CommunicationsModel) {
    super();
    this.getCommunications = this.getCommunications.bind(this);
    this.saveCommunication = this.saveCommunication.bind(this);
    this.getCommunication = this.getCommunication.bind(this);
    this.deleteCommunication = this.deleteCommunication.bind(this);
  }

  public async getCommunication(request: Request): Promise<CommunicationGetResponse> {
    const id = parseInt(request.params.id, 10);
    const communicationNullable = await this.communicationsModel.getCommunication(id);
    const communication = orElseThrow(communicationNullable,
      Boom.notFound(transformErrors(thrownErrMsg.communicationNotFound, {id: `${id}`})));
    return CommunicationsModel.toApiResponse(communication);
  }

  public async getCommunications(request: Request): Promise<CommunicationGetResponse[]> {
    const communications = await this.communicationsModel.getCommunications();
    return communications.map(CommunicationsModel.toApiResponse);
  }

  public async saveCommunication(request: Request): Promise<CommunicationGetResponse> {
    const communicationPayload = request.payload as CommunicationBase;
    const communicationNullable =  await this.communicationsModel.saveCommunication(communicationPayload);
    const communication = orElseThrow(communicationNullable, Boom.internal(thrownErrMsg.communicationSaveError));
    return CommunicationsModel.toApiResponse(communication);
  }

  public async deleteCommunication(request: Request): Promise<ApiMessageResponse> {
    const id = parseInt(request.params.id, 10);
    const communicationNullable = await this.communicationsModel.getCommunication(id);
    orElseThrow(communicationNullable, Boom.notFound(transformErrors(thrownErrMsg.communicationNotFound,
      {id: `${id}`})));
    try {
      await this.communicationsModel.deleteCommunication(id);
    } catch (err) {
      logger.error(`Error deleting communication with id=${id}`, err);
      Boom.internal(transformErrors(thrownErrMsg.communicationDelete, {id: `${id}`}));
    }
    return {message: `Successfully deleted communication with id=${id}` };
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "GET",
        options: {
          auth: false,
          handler: this.getCommunications,
          response: {
            schema: joiCommunicationsGetResponse,
          },
        },
        path: "/api/v1/communications",
      },
      {
        method: "GET",
        options: {
          auth: false,
          handler: this.getCommunication,
          response: {
            schema: joiCommunicationGetResponse,
          },
          validate: {
            params: Joi.object({
              id: Joi.number().min(1),
            }),
          },
        },
        path: "/api/v1/communications/{id}",
      },
      {
        method: "POST",
        options: {
          handler: this.saveCommunication,
          response: {
            schema: joiCommunicationGetResponse,
          },
          validate: {
            payload: joiCommunicationPayload,
          },
        },
        path: "/api/v1/communications",
      },
      {
        method: "DELETE",
        options: {
          handler: this.deleteCommunication,
          response: {
            schema: joiApiMessageResponse,
          },
          validate: {
            params: Joi.object({
              id: Joi.number().min(1),
            }),
          },
        },
        path: "/api/v1/communications/{id}",
      },
    ];
  }
}
