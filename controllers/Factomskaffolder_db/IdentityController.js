import IdentityControllerGenerated from "./generated/IdentityControllerGenerated";

// Properties
import Properties from "../../properties";

// Database
import IdentityModel from "../../models/Factomskaffolder_db/IdentityModel";

// Security
import { authorize } from "../../security/SecurityManager";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

const customControllers = {
  

   
};

export default {
  ...IdentityControllerGenerated,
  ...customControllers
};

