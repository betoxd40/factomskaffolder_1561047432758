import Database from "../../classes/Database_Factomskaffolder_db"
import EntryModel from './EntryModel'

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

      //TODO: this should be handled by the CONTROLLER 
      if(doctor) {
        
        // Get The Doctor identity related to this Patient 
        const doctorResult = await Database.getConnection().models.Doctor.findByPk(doctor)
        const { identity } = doctorResult.dataValues;

        // Search the Identity data
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

        // We create the entry content
        patientData = generatedModel.convertEntryContent(patientData, "Create");

        EntryModel.create(
          chain_id, key_pairs[0].private_key, signerChainId, patientData, _id,
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
      
      const patientResult = await Database.getConnection().models.Patient.findOne({
        where: { _id: id }
      });
      const doctorId = patientResult.dataValues.doctor;

      const result = await Database.getConnection().models.Patient.update(patientData, {
        where: { _id: id }
      });

      // We create the entry content
      patientData = generatedModel.convertEntryContent(patientData, "Update");

      /*
        If we are updating the Doctor ID, we need to add two entries, one for the original Audit Chain
        and the second one for NEW Audit Chain, otherwise we just update the original Audit Chain.
      */
      if(doctor !== doctorId) {
        generatedModel.createEntry(doctor, patientData);
      }
      generatedModel.createEntry(doctorId, patientData);

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
      const { doctor } = await Database.getConnection().models.Patient.findOne({
        where: { _id: id }
      });

      const result = await Database.getConnection().models.Patient.destroy({ where: { _id: id } });

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

      // We create the entry content
      let patientData = generatedModel.convertEntryContent({id}, "Delete");

      EntryModel.create(
        chain_id, key_pairs[0].private_key, signerChainId, patientData, _id,
      );

      return result;
    } catch(e) {
      console.log(e);
    }
  },

  /*
    First we get the Doctor information related to the foreign key of the Patient
    then, we get The Identity and the Audit Chain related to this identity
    finally, we create an entry into this Audit Chain.
  */
  createEntry: async (doctorId, patientData) => {

    // Get The Doctor identity related to this Patient 
    const doctorResult = await Database.getConnection().models.Doctor.findByPk(doctorId)
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
      chain_id, key_pairs[0].private_key, signerChainId, patientData, _id,
    );
  },

  /*
    Util function
    Convert the JSON data into a Nomenclature for the Entry Content.
  */
  convertEntryContent: (record, action) => {
    return {
      record,
      action
    }
  }
};

export default {
  ...generatedModel
};
