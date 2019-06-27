import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";

const factomConnectSDK = new Factom(Properties.factomConfig);

const generatedModel = {
  
  /**
  * ChainModel.create
  * @param signerPrivateKey
  * @param signerChainId
  * @param content
  * @param identity
  * @description CRUD ACTION create
  */
  create: async (signerPrivateKey, signerChainId, content, identity) => {
    try {
      const { chain_id, entry_hash, stage } = await factomConnectSDK.chains.create({
        signerPrivateKey,
        signerChainId,
        content,
      });
      let result = await Database.getConnection().models.Chain.create({
        chain_id, entry_hash, stage, identity,
      });
      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * ChainModel.list
  *   @description CRUD ACTION list
  *
  */
  async list() { 
    let list = await Database.getConnection().models.Chain.findAll();
    return list;
  }

};

export default {
  ...generatedModel,
};
