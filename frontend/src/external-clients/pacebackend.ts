import { HttpClient, HttpRequestConfig } from "../utils/http";
import config from "../config/index";

interface VerifyAuthenticationResponse {
    verification: boolean;
}

export class PaceBackendClient {

    private static AUTH_URL: string = "/api/v1/account/verify"
    private static COMMUNICATIONS_URL: string = "api/v1/communications"

    private username: string;
    private password: string;

    constructor(
        private httpClient: HttpClient,
        private endpoint: string = config.pacebackendHost,
    ) { /* */ }

    public async authenticate(username: string, password: string): Promise<boolean> {
        const url = `${this.endpoint}${PaceBackendClient.AUTH_URL}`;
        const requestParams: HttpRequestConfig = {
            password,
            url,
            username,
        };
        const response = await this.httpClient.get<VerifyAuthenticationResponse>(requestParams);
        if (response.status === 200 && response.data.verification === true) {
            this.initializeCredentials(username, password);
            return true;
        }
        return false;
    }

    private initializeCredentials(username: string, password: string): void {
        this.username = username;
        this.password = password;
        return;
    }
}