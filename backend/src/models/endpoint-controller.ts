import { ServerRoute } from "@hapi/hapi";

export abstract class EndpointController {
    public abstract registerRoutes(): ServerRoute[];
}
