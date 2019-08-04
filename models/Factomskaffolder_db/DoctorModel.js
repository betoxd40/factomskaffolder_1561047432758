import Database from "../../classes/Database_Factomskaffolder_db";
import IdentityModel from './IdentityModel';

const generatedModel = {

  /**
  * DoctorModel.create
  * @description CRUD ACTION create
  * @param first_name
  * @param last_name
  * @param speciality
  */
  create: async ({first_name, last_name, speciality, identity = null}) => {
    // If the factom identity service is disabled, the identity will be null
    // otherwise, will receive the identity related to this model.
    try{
      let result = await Database.getConnection().models.Doctor.create({
        first_name, last_name, speciality, identity,
      });
      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /**
  * DoctorModel.list
  * @description CRUD ACTION list
  *
  */
  async list() {
    try {
      let result = await Database.getConnection().models.Doctor.findAll();
      return result;
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  ...generatedModel
};
