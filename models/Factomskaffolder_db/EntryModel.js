import Properties from "../../properties";
import Factom from "factom-harmony-connect"
import Database from "../../classes/Database_Factomskaffolder_db";
import sha256 from 'sha256';
import canonicalize from 'canonical-json';

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
  create: async (chainId, signerPrivateKey, signerChainId, modelContent, chain) => {
    try {
      // Convert the model content into a hash
      const content = sha256(canonicalize(modelContent));
      const test = await factomConnectSDK.chains.entries.create({
        chainId,
        signerPrivateKey,
        signerChainId,
        content,
      });
      let result = await Database.getConnection().models.Entry.create({
        entry_hash: test.entry_hash, chain, content
      });
      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * EntryModel.list
  * @description CRUD ACTION list
  *
  */
  async list() {
    try {
      let list = await Database.getConnection().models.Entry.findAll();
      return list;
    } catch (e) {
      console.log(e);
    }
  },

};


export default {
  ...generatedModel,
};
