
import ReportControllerGenerated from "./generated/ReportControllerGenerated";

// Properties
import Properties from "../../properties";

// Database
import ReportModel from "../../models/Factomskaffolder_db/ReportModel";

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
    const baseUrl = `${Properties.api}/report`;
    router.get(baseUrl + "", generatedControllers.list);
    router.post(baseUrl + "", generatedControllers.create);
  },


  // CRUD METHODS

  /**
   * ReportModel.create
   * @description CRUD ACTION create
   *
   */
  create: async (req, res) => {
    try {
      const result = await ReportModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * ReportModel.list
   *   @description CRUD ACTION list
   *
   */
  list: async (req, res) => {
      try {
        const result = await ReportModel.list();
        res.json(result);
      } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
      }
    },

};

export default {
  ...generatedControllers
};

