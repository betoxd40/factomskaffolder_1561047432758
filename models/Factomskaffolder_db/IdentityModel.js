import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";
const uuid = require('uuid/v1');

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
  create: async () => {
    
    const id = uuid();
    try {
      const { chain_id, entry_hash, key_pairs, stage } = await factomConnectSDK.identities.create({
        names: [id],
      });
      let result = await Database.getConnection().models.Identity.create({
        chain_id, entry_hash, key_pairs: key_pairs.toString(), stage
      });
      const insertedId = result.dataValues._id;
      return insertedId;
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
  let list = await Database.getConnection().models.Identity.findAll();
  return list;
 }

};
export default {
  ...generatedModel,
};
