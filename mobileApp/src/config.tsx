export interface Config {
    serverHost: string;
}

export const release: Config = {
    serverHost: "",
};

export const dev: Config = {
    serverHost: "192.168.1.14:3000",
};

export const get = (): Config => {
    if (__DEV__) {
        return dev;
    }
    return release;
};
