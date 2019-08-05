module.exports = {
	factomskaffolder_db: {
        name: "factomskaffolder_db",
        user: "postgres",
        password: "",
        host: "localhost",
        port: 5432,
        dialect: "postgres"
    },
    
    factom: {
        config: {
            baseUrl: "FACTOM_BASE_URL",
            accessToken: {
                appId: "FACTOM_APP_ID",
                appKey: "FACTOM_APP_KEY"
            },
        },
        model: {
            Doctor: {
                factomized: null,
                has_identity: true,
            },
            Patient: {
                factomized: 'Doctor', // This should be the same model name as we have in the model document.
                has_identity: false,
            },
            Report: {
                factomized: 'Doctor', // This should be the same model name as we have in the model document.
                has_identity: false,
            },
        },
    },

    publicPath: "../client/dist",
	port: 3000,
    tokenSecret: "Insert Your Secret Token",
    api: "/api"
}