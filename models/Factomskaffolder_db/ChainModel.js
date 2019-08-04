import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";

const factomConnectSDK = new Factom(Properties.factom.config);

const generatedModel = {
  
  /**
  * ChainModel.create
  * @param signerPrivateKey
  * @param signerChainId
  * @param content
  * @param identity
  * @description CRUD ACTION create
  */
  create: async (signerPrivateKey, signerChainId, content, entryHash, identity,) => {
    try {
      if(!signerPrivateKey) {
        // Chain Management
        let result = await Database.getConnection().models.Chain.create({
          chain_id: signerChainId, entry_hash: entryHash, content, identity,
        });
        return result;
      } else {
        // Chain Audit
        const { chain_id, entry_hash } = await factomConnectSDK.chains.create({
          signerPrivateKey,
          signerChainId,
          content,
        });
        let result = await Database.getConnection().models.Chain.create({
          chain_id, entry_hash, content, identity,
        });
        return result;
      }
    } catch(e) {
      if (e.response.status === 403) {
        throw new Errors.INVALID_AUTH_FACTOM();
      } else if (e.response.status === 429) {
        throw new Errors.EXCEDEED_LIMIT_REQUEST()
      }
    }
  },


  /**
  * ChainModel.list
  * @description CRUD ACTION list
  *
  */
  async list() {
    try {
      let list = await Database.getConnection().models.Chain.findAll();
      return list;
    } catch (e) {
      console.log(e);
    }
  }

};

export default {
  ...generatedModel,
};
