import Properties from "../../properties";

const factomConnectSDK = new Factom(Properties.factomConfig);

const generatedModel = {
  
  /**
  * IdentityModel.create
  * @description CRUD ACTION create
  * @param {[String]} names 
  * @param {[String]=} keys 
  * @param {String=} callbackUrl 
  * @param {Object=} callbackStages 
  * @param {Object=} accessToken 
  * @param {String=} baseUrl 
  */
  createIdentity = async (names, keys, callbackUrl, callbackStages, accessToken, baseUrl) => {
    const response = await factomConnectSDK.identities.create({
      names, keys, callbackUrl, callbackStages, accessToken, baseUrl
    });
    let result = await Database.getConnection().models.Identity.create(response);
    return result;
  },

};
export default {
  ...generatedModel,
};
