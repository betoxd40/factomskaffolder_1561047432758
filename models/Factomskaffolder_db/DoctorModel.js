import Database from "../../classes/Database_Factomskaffolder_db";
import IdentityModel from './IdentityModel';

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
  create: async ({first_name, last_name, speciality}) => {
    try{
      const id = await IdentityModel.create();
      let result = await Database.getConnection().models.Doctor.create({
        first_name, last_name, speciality, identity: id,
      });
      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * UserModel.list
  * @description CRUD ACTION list
  *
  */
  async list() {
    try {
      let result = await Database.getConnection().models.Identity.findAll();
      const stringify = result.key_pairs;
      return result;
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  ...generatedModel
};
