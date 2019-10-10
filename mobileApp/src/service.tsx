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
    constructor(
        private host: string,
    ) { }

    public async fetchCommunications(): Promise<Communication[]> {
        // return [];
        const resp: AxiosResponse<Communication[]> =
            await axios.get(`http://${this.host}/api/v1/communications`);
        return resp.data;
    }
}
