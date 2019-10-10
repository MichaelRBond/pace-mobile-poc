import axios, { AxiosResponse } from "axios";

export interface Communication {
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

    public async fetchCommunications(): Promise<Communication[]> {
        const resp: AxiosResponse<Communication[]> =
            await axios.get("http://192.168.1.14:3000/api/v1/communications");
        return resp.data;
    }
}
