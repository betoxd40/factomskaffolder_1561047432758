import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";

const factomConnectSDK = new Factom(Properties.factomConfig);

const generatedModel = {
  
  /**
  * EntryModel.create
  * @param chainId
  * @param signerPrivateKey
  * @param signerChainId
  * @param content
  * @param chain
  * @description CRUD ACTION create
  */
  create: async (chainId, signerPrivateKey, signerChainId, content, chain) => {
    try {
      const { entry_hash, stage } = await factomConnectSDK.chains.create({
        chainId,
        signerPrivateKey,
        signerChainId,
        content,
      });
      let result = await Database.getConnection().models.Entry.create({
        entry_hash, stage, chain,
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
