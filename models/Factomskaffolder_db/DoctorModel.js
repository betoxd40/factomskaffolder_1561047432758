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
