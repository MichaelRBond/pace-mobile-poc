import { Request, ServerRoute } from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import { ApiMessageResponse, joiApiMessageResponse } from "../models/api";
import { EndpointController } from "../models/endpoint-controller";

export class RsvpController extends EndpointController {

  constructor() {
    super();
    this.saveRsvp = this.saveRsvp.bind(this);
    this.deleteRsvp = this.deleteRsvp.bind(this);
  }

  public async saveRsvp(request: Request): Promise<ApiMessageResponse> {
    const id = parseInt(request.params.id, 10);
    return {message: `RSVP for communication id=${id} saved successfully` };
  }

  public async deleteRsvp(request: Request): Promise<ApiMessageResponse> {
    const id = parseInt(request.params.id, 10);
    return {message: `RSVP for communication id=${id} saved successfully` };
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "POST",
        options: {
          handler: this.saveRsvp,
          response: {
            schema: joiApiMessageResponse,
          },
          validate: {
            params: Joi.object({
              id: Joi.number().min(1),
            }),
          },
        },
        path: "/api/v1/rsvp/{id}",
      },
      {
        method: "DELETE",
        options: {
          handler: this.deleteRsvp,
          response: {
            schema: joiApiMessageResponse,
          },
          validate: {
            params: Joi.object({
              id: Joi.number().min(1),
            }),
          },
        },
        path: "/api/v1/rsvp/{id}",
      },
    ];
  }
}
