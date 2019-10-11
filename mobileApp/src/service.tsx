import axios, { AxiosResponse } from "axios";
import { AsyncStorage } from "react-native";

export interface Communication {
    id: number;
    subject: string;
    body: string;
    created_date: number;
    expiration_date: number;
    rsvp: boolean;
    event?: {
        start_date: number;
        end_date: number;
    };
}

export class Service {
    constructor(
        private host: string,
    ) { }

    public async fetchCommunications(): Promise<Communication[]> {
        const resp: AxiosResponse<Communication[]> =
            await axios.get(`http://${this.host}/api/v1/communications`);
        const communications = resp.data;
        for (const c of communications) {
            try {
                const val = await AsyncStorage.getItem(`rsvp.${c.id}`);
                c.rsvp = val === "true";
            } catch {
                c.rsvp = false;
            }
        }
        return communications;
    }

    public async saveRsvp(id: number, val: boolean): Promise<void> {
        if (val) {
            axios.post(`http://${this.host}/api/v1/rsvp/${id}`);
        } else {
            axios.delete(`http://${this.host}/api/v1/rsvp/${id}`);
        }
        await AsyncStorage.setItem(`rsvp.${id}`, `${val}`);
    }
}
