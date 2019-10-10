import * as Joi from "@hapi/joi";

export interface ApiMessageResponse {
  message: string;
}

export const joiApiMessageResponse = Joi.object({
  message: Joi.string(),
});
