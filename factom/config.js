import Factom from "factom-harmony-connect"

const factomConnectSDK = new Factom({
    baseUrl: "YOUR API URL",
    accessToken: {
        appId: "YOUR APP ID",
        appKey: "YOUR APP KEY"
    },
});

export { factomConnectSDK };