export interface Config {
    serverHost: string;
}

export const release: Config = {
    serverHost: "192.241.138.158:3001",
};

export const dev: Config = {
    // serverHost: "localhost:3000",
    serverHost: "192.241.138.158:3001",
};

export const get = (): Config => {
    if (__DEV__) {
        return dev;
    }
    return release;
};
