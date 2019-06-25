import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";

const factomConnectSDK = new Factom(Properties.factomConfig);

const generatedModel = {
  
  /**
  * IdentityModel.create
  * @description CRUD ACTION create
  * @param {[String]} names 
  * @param {[String]=} keys 
  * @param {String=} callbackUrl 
  * @param {Object=} callbackStages 
  * @param {Object=} accessToken 
  * @param {String=} baseUrl 
  */
  create: async ({names, keys, callbackUrl, callbackStages, accessToken, baseUrl}) => {
    try {
      const response = await factomConnectSDK.identities.create({
        names, keys, callbackUrl, callbackStages, accessToken, baseUrl
      });
      let result = await Database.getConnection().models.Identities.create(response);
      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * UserModel.list
  *   @description CRUD ACTION list
  *
  */
 async list() { 
  let list = await Database.getConnection().models.Identities.findAll();
  return list;
 }

};
export default {
  ...generatedModel,
};
