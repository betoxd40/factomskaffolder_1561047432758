// Properties
import Properties from "../../properties";

// Database
import IdentitiesModel from "../../models/Factomskaffolder_db/IdentitiesModel";

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
    const baseUrl = `${Properties.api}/identities`;
  },


  // CRUD METHODS

  /**
  * IdentityModel.create
  *   @description CRUD ACTION create
  *
  */
  create: async (req, res) => {
    try {
      const result = await UserModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },


  // Custom APIs

};

export default {
  ...generatedControllers,
};

