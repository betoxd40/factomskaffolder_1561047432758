// Import Sequelize
import Sequelize from "sequelize";
import Database from "../classes/Database_Factomskaffolder_db";

export default init => {
  let sequelize = Database.getConnection();


    /**
      * ------------------------------------
      * Start define generated schema
      *
      * The content of this section will be overwritten on each documentation, 
      * please insert your customization at the top or at the end of the file.
      * ------------------------------------
      */



    /**
      * ------------------------------------
      * Doctor
      * ------------------------------------
      */
    class Doctor extends Sequelize.Model{}
    Doctor.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      first_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      last_name: {
        type: Sequelize.STRING
      },
      
      speciality: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      identity:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Identity",
          key: '_id',
        },
      },
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "doctor", timestamps: false, modelName: "Doctor" }
    );

    class Chain extends Sequelize.Model{}
    Chain.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      chain_id: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      entry_hash: {
        type: Sequelize.STRING
      },

      content: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      identity:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Identity",
          key: '_id',
        },
      },
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "chain", timestamps: false, modelName: "Chain" }
    );

    class Entry extends Sequelize.Model{}
    Entry.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      entry_hash: {
        type: Sequelize.STRING
      },

      content: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      chain:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Chain",
          key: '_id',
        },
      },
    },
      { sequelize, tableName: "entry", timestamps: false, modelName: "Entry" }
    );



    /**
      * ------------------------------------
      * Identity
      * ------------------------------------
      */
    class Identity extends Sequelize.Model{}
    Identity.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      chain_id: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      entry_hash: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      key_pairs: {
        type: Sequelize.JSON, 
      },
      
      //RELATIONS
        
      
      
      //EXTERNAL RELATIONS
      /*
      identity: {
        type: Sequelize.INTEGER,
        references: {
          model: Doctor,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "identity", timestamps: false, modelName: "Identity" }
    );



    /**
      * ------------------------------------
      * Patient
      * ------------------------------------
      */
    class Patient extends Sequelize.Model{}
    Patient.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      condition: {
        type: Sequelize.STRING
      },
      
      first_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      last_name: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      doctor:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctor",
          key: '_id',
        },
      },

    },
      { sequelize, tableName: "patient", timestamps: false, modelName: "Patient" }
    );



    /**
      * ------------------------------------
      * Report
      * ------------------------------------
      */
    class Report extends Sequelize.Model{}
    Report.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      description: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
      doctor:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctor",
          key: '_id',
        },
      },
      patient:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Patient",
          key: '_id',
        },
      },
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "report", timestamps: false, modelName: "Report" }
    );



    /**
      * ------------------------------------
      * User
      * ------------------------------------
      */
    class User extends Sequelize.Model{}
    User.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      mail: {
        type: Sequelize.STRING
      },
      
      name: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      surname: {
        type: Sequelize.STRING
      },
      
      username: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "user", timestamps: false, modelName: "User" }
    );

    
  /**
   * ------------------------------------
   * End define generated schema
      * ------------------------------------
      */

    /**
      * ------------------------------------
      * Roles
      * ------------------------------------
      */
    class Roles extends Sequelize.Model{}
    Roles.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      role: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      _user:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      }
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "roles", modelName: "Roles", timestamps: false }
    );

    User.hasMany(Roles, {
      foreignKey: "_user"
    });

    /**
      * ------------------------------------
      * Insert here your custom models
      * ------------------------------------
      */

};
