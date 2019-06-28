import Database from "../../classes/Database_Factomskaffolder_db"
import EntryModel from './EntryModel'

const generatedModel = {

  /**
  * DoctorModel.create
  * @description CRUD ACTION create
  * @param first_name
  * @param last_name
  * @param speciality
  */
  create: async ({first_name, last_name, condition, doctor = null}) => {
    try{
      let result = await Database.getConnection().models.Patient.create({
        first_name, last_name, condition, doctor
      });

      // 
      if(doctor) {

        // Get The Doctor identity related to this Patient 
        const doctorResult = await Database.getConnection().models.Doctor.findByPk(doctor)
        const { identity } = doctorResult.dataValues;

        // Search the Audit Chain related to this identity
        const identityResult = await Database.getConnection().models.Identity.findOne({
          where: {
            _id: identity

          }
        });

        // Search the Audit Chain related to this identity
        const auditChain = await Database.getConnection().models.Chain.findOne({
          where: {
            identity,
            content: "Audit Chain"

          }
        });

        // Extract the data and used it to create the Entry
        const { _id, chain_id } = auditChain.dataValues;
        const { key_pairs } = identityResult.dataValues;
        const signerChainId = identityResult.dataValues.chain_id;
        EntryModel.create(
          chain_id, key_pairs[0].private_key, signerChainId, "Patient Created", _id,
        );
      }

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
      let result = await Database.getConnection().models.Patient.findAll();
      return result;
    } catch (e) {
      console.log(e);
    }
  },
  
};

export default {
  ...generatedModel
};
