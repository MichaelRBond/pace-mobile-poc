import axios, { AxiosResponse } from "axios";

export interface BroadcastedEvent {
    id: number;
    subject: string;
    body: string;
    created_date: number;
    expiration_date: number;
    event?: {
        start_time: number;
        end_time: number;
    };
}

export class Service {
    constructor() {
        /** noop */
    }

    public async fetchCommunications(): Promise<BroadcastedEvent[]> {
        const resp: AxiosResponse<BroadcastedEvent[]> =
            await axios.get("http://192.168.1.14:3000/api/v1/communications");
        return resp.data;
    }
}
