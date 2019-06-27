// Properties
import Properties from "../../properties";

// Database
import DoctorModel from "../../models/Factomskaffolder_db/DoctorModel";

// Security
import { authorize } from "../../security/SecurityManager";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

const generatedControllers = {
  
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}/doctor`;
    router.post(baseUrl + "", generatedControllers.create);
    router.get(baseUrl + "", generatedControllers.list);
  },


  // CRUD METHODS

  /**
   * DoctorModel.create
   * @description CRUD ACTION create
   *
   */
  create: async (req, res) => {
    try {
      const result = await DoctorModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * DoctorModel.list
   *   @description CRUD ACTION list
   *
   */
 list: async (req, res) => {
    try {
      const result = await DoctorModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  
  // Custom APIs
   
};

export default {
  ...generatedControllers
};

