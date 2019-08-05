// Properties
import Properties from "../../properties";

// Database
import PatientModel from "../../models/Factomskaffolder_db/PatientModel";

// Security
import { authorize } from "../../security/SecurityManager";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

// Services
import { factomize, getRelationIdentityId } from "../../services/factom";

const generatedControllers = {
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}/patient`;
    router.post(baseUrl + "", generatedControllers.create);
    router.get(baseUrl + "", generatedControllers.list);
    router.put(baseUrl + "/:id", generatedControllers.update);
    router.delete(baseUrl + "/:id", generatedControllers.delete);
  },

  // CRUD METHODS

  /**
   * PatientModel.create
   * @description CRUD ACTION create
   *
   */
  create: async (req, res) => {
    try {
      // Factom method
      await factomize("Patient", req.body, "POST", "doctor");

      const result = await PatientModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * PatientModel.list
   *   @description CRUD ACTION list
   *
   */
  list: async (req, res, next) => {
    try {
      const result = await PatientModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
   * PatientModel.update
   * @description CRUD ACTION update
   * @param ObjectId id Id
   *
   */
  update: async (req, res) => {
    try {
      // Factom methods
      await factomize("Patient", req.body, "PUT", "doctor", req.params.id);
      const result = await PatientModel.update(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * PatientModel.delete
   * @description CRUD ACTION delete
   * @param ObjectId id Id
   *
   */
  delete: async (req, res) => {
    try {
      // Factom methods
      await factomize("Patient", req.body, "DELETE", "doctor", req.params.id);

      const result = await PatientModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }
};

export default {
  ...generatedControllers
};
