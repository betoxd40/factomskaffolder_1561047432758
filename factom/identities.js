import { factomConnectSDK } from './config';
//TODO: where's this documentation ? 

/**
 * Create the identity
 * @param {[String]} names 
 * @param {[String]=} keys 
 * @param {String=} callbackUrl 
 * @param {Object=} callbackStages 
 * @param {Object=} accessToken 
 * @param {String=} baseUrl 
 */
const createIdentity = async (names, keys, callbackUrl, callbackStages, accessToken, baseUrl) =>
    await factomConnectSDK.identities.create({
        names, keys, callbackUrl, callbackStages, accessToken, baseUrl
    });

// Get identity
const identityObj = await factomConnectSDK.identities.get({
    identityChainId: '107c8e488e95b63ca6fe1c409aa22c380b5c7be387d139c1cd0afaf608d1ae42'
});
