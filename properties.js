module.exports = {
	factomskaffolder_db: {
        name: "factomskaffolder_db",
        user: "root",
        password: "yanes6514",
        host: "localhost",
        port: 3306,
        dialect: "mysql"
    },
    
    factomConfig: {
        baseUrl: "YOUR API URL",
        accessToken: {
            appId: "YOUR APP ID",
            appKey: "YOUR APP KEY"
        },
    },

    publicPath: "../client/dist",
	port: 3000,
    tokenSecret: "Insert Your Secret Token",
    api: "/api"
}