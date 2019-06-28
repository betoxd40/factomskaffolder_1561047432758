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

      //TODO: this should be handled by the CONTROLLER 
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

  /**
   * PatientModel.update
   * @description CRUD ACTION update
   * @param ObjectId id Id
   *
   */
  async update({first_name, last_name, condition, doctor = null}) {
    try {
      let result = await Database.getConnection().models.User.update(item, {
        where: { _id: item._id }
      });
      
      //TODO: this should be handled by the CONTROLLER 
      
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
        chain_id, key_pairs[0].private_key, signerChainId, "Patient Updated", _id,
      );

      return result;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * PatientModel.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  async delete(id) {
    try {
      const patientResult = await Database.getConnection().models.Doctor.findByPk(id)
      const { doctor } = patientResult.dataValues;

      const result = await Database.getConnection().models.User.destroy({ where: { _id: id } });

      //TODO: this should be handled by the CONTROLLER 
      
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
        chain_id, key_pairs[0].private_key, signerChainId, "Patient Deleted", _id,
      );

      return result;
    } catch(e) {
      console.log(e);
    }
  },
  
};

export default {
  ...generatedModel
};
