import Database from "../../classes/Database_Factomskaffolder_db"

const generatedModel = {

  /**
   * Factomize created/updated/deleted records checkbox selected
   * 
   * DoctorModel.create
   * @description CRUD ACTION create
   * @param first_name
   * @param last_name
   * @param speciality
   */
  create: async ({first_name, last_name, condition, doctor = null}) => {
    try{
      let patientData = {first_name, last_name, condition, doctor};
      let result = await Database.getConnection().models.Patient.create(patientData);
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
  list: async () => {
    try {
      let result = await Database.getConnection().models.Patient.findAll();
      return result;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Factomize created/updated/deleted records checkbox selected
   * 
   * PatientModel.update
   * @description CRUD ACTION update
   * @param ObjectId id Id
   *
   */
  update: async (id, {first_name, last_name, condition, doctor = null}) => {
    try {
      const patientData = {first_name, last_name, condition, doctor};
      const result = await Database.getConnection().models.Patient.update(patientData, {
        where: { _id: id }
      });
      
      return result;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Factomize created/updated/deleted records checkbox selected
   * 
   * PatientModel.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  delete: async id => {
    try {
      const result = await Database.getConnection().models.Patient.destroy({ where: { _id: id } });
      return result;
    } catch(e) {
      console.log(e);
    }
  },
};

export default {
  ...generatedModel
};
