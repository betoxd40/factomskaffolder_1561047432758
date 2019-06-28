import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db"
import ChainModel from './ChainModel'
import uuid from 'uuid/v1';

const factomConnectSDK = new Factom(Properties.factomConfig);

const generatedModel = {
  
  /**
  * IdentityModel.create
  * @description CRUD ACTION create
  */
  create: async () => {
    
    // Generate an unique ID for the identity
    const id = uuid();

    try {
      const { chain_id, entry_hash, key_pairs, stage } = await factomConnectSDK.identities.create({
        names: [id],
      });
      let result = await Database.getConnection().models.Identity.create({
        chain_id, entry_hash, key_pairs, stage
      });
      const insertedId = result.dataValues._id;

      // Create Audit and Management Chain
      // TODO: this should be handled by the CONTROLLER
      const auditChain = await ChainModel.create(
        key_pairs[0].private_key, chain_id, "Audit Chain", insertedId,
      );
      const managementChain = await ChainModel.create(
        key_pairs[0].private_key, chain_id, "Management Chain", insertedId,
      );

      // Return the id inserted
      return insertedId;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * IdentityModel.list
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
