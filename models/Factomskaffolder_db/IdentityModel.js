import Properties from "../../properties";
import Factom from "factom-harmony-connect";
import Database from "../../classes/Database_Factomskaffolder_db";
import ChainModel from "./ChainModel";
import uuid from "uuid/v1";

const factomConnectSDK = new Factom(Properties.factom.config);

const generatedModel = {
  /**
   * IdentityModel.create
   * @description CRUD ACTION create
   */
  create: async () => {
    // Generate an unique ID for the identity
    const id = uuid();

    try {
      const {
        chain_id,
        entry_hash,
        key_pairs
      } = await factomConnectSDK.identities.create({
        names: [id]
      });

      let result = await Database.getConnection().models.Identity.create({
        chain_id,
        entry_hash,
        key_pairs
      });

      const insertedId = result.dataValues._id;

      // Create Audit and Management Chain
      const auditChain = await ChainModel.create(
        key_pairs[0].private_key,
        chain_id,
        "Audit Chain",
        entry_hash,
        insertedId
      );
      const managementChain = await ChainModel.create(
        null,
        chain_id,
        "Management Chain",
        entry_hash,
        insertedId
      );

      // Return the id inserted
      return insertedId;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * IdentityModel.list
   *  @description CRUD ACTION list
   *
   */
  async list() {
    let list = await Database.getConnection().models.Identity.findAll();
    return list;
  }
};
export default {
  ...generatedModel
};
