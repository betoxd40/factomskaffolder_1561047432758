import Database from "../../classes/Database_Factomskaffolder_db";
import ReportModelGenerated from "./generated/ReportModelGenerated";

const customModel = {

  /**
  * ReportModel.create
  * @description CRUD ACTION create
  * @param description
  * @param doctor
  * @param patient
  */
 create: async ({description, doctor, patient}) => {
  try{
    let result = await Database.getConnection().models.Report.create({
      description, doctor, patient
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
    let result = await Database.getConnection().models.Report.findAll();
    return result;
  } catch (e) {
    console.log(e);
  }
},

};

export default {
  ...ReportModelGenerated,
  ...customModel
};
