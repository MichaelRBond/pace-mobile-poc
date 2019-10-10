import { Request, ServerRoute } from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import { EndpointController } from "../models/endpoint-controller";
import { RsvpModel, RsvpResponse } from "../models/rsvp";

const joiRsvpResponse = Joi.object({
  count: Joi.number(),
  id: Joi.number(),
});

export class RsvpController extends EndpointController {

  constructor(private rsvpModel: RsvpModel) {
    super();
    this.saveRsvp = this.saveRsvp.bind(this);
    this.deleteRsvp = this.deleteRsvp.bind(this);
    this.getRsvp = this.getRsvp.bind(this);
  }

  public async saveRsvp(request: Request): Promise<RsvpResponse> {
    const id = parseInt(request.params.id, 10);
    const count = await this.rsvpModel.save(id);
    return {
      count,
      id,
    };
  }

  public async deleteRsvp(request: Request): Promise<RsvpResponse> {
    const id = parseInt(request.params.id, 10);
    const count = await this.rsvpModel.deleteRsvp(id);
    return {
      count,
      id,
    };
  }

  public async getRsvp(request: Request): Promise<RsvpResponse> {
    const id = parseInt(request.params.id, 10);
    const count = await this.rsvpModel.getCount(id);
    return {
      count,
      id,
    };
  }

  public registerRoutes(): ServerRoute[] {
    return [
      {
        method: "POST",
        options: {
          handler: this.saveRsvp,
          response: {
            schema: joiRsvpResponse,
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
            schema: joiRsvpResponse,
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
        method: "get",
        options: {
          handler: this.getRsvp,
          response: {
            schema: joiRsvpResponse,
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
