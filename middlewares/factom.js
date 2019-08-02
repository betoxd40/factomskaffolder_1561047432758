import IdentityModel from "../models/Factomskaffolder_db/IdentityModel";

/**
 * This method will be executed everytime a record is generated in the Model who have
 * create identity for each record selected.
 * Create action will receive an additional key from the body called "identity_id", this will have the id
 * created for that relation.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createIdentity = async (req, res, next) => {
  const id = await IdentityModel.create();
  req.body.identity_id = id;
  next();
};

const factomize = (req, res, next) => {
  let modelData = req;
  console.log(req);
  next();
};

export { createIdentity, factomize };
