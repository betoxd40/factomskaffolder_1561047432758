// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_factomskaffolder_db";
import UserModel from "../models/Factomskaffolder_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.factomskaffolder_db.host +
        ":" +
        properties.factomskaffolder_db.port +
        "//" +
        properties.factomskaffolder_db.user +
        "@" +
        properties.factomskaffolder_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.factomskaffolder_db.name,
      properties.factomskaffolder_db.user,
      properties.factomskaffolder_db.password,
      {
        host: properties.factomskaffolder_db.host,
        dialect: properties.factomskaffolder_db.dialect,
        port: properties.factomskaffolder_db.port,
        logging: false
      }
    );
    this.dbConnection_factomskaffolder_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_factomskaffolder_db;
  }
}

export default new Database();
