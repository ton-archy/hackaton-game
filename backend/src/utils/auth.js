const userService = require('../services/UserService');
const CryptoJS = require("crypto-js")

const HASH_FIELD = "hash";
const ID_FIELD= "id";
const USERDATA_FIELD = "user";
let TELEGRAM_BOT_TOKEN = "7024487799:AAHUkapYvZDWf5NNQ2PLZ46PuPry9IUT6DU";
const TELEGRAM_HMAC_MESSAGE = "WebAppData";

if (process.env.NODE_ENV === 'production') {
  TELEGRAM_BOT_TOKEN = "5728156063:AAFa5ZdrEfTfTsApvweUGQgro9yo9sV1Mb4";
}

const parseQuery = (initData) => {
  const initParams = new URLSearchParams(initData);
  const initDataObj = {};
  initParams.forEach((val, key) => initDataObj[key] = val);
  initDataObj[USERDATA_FIELD] = JSON.parse(initDataObj[USERDATA_FIELD]);

  return initDataObj;
}

const prepareDataToHash = (initData) => {
  return Object.keys(initData)
    .filter(key => key != HASH_FIELD)
    .sort()
    .map(key => {
      const value = typeof initData[key] === 'object' ? JSON.stringify(initData[key]) : initData[key]
      return `${key}=${value}`
    })
    .join("\n");
}

const deriveHash = (keyStr) => {
  const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, TELEGRAM_HMAC_MESSAGE);
  return CryptoJS.HmacSHA256(keyStr, secret).toString(CryptoJS.enc.Hex);
}

const checkAuth = async (req, res, next) => {
  const token = req.headers.token;
  const params = parseQuery(token);
  const userData = params[USERDATA_FIELD];
  const userName = userData[ID_FIELD];
  const givenHash = params[HASH_FIELD];
  const user = await userService.getUser(userName);

  if(!user) {
    const derivedHash = deriveHash(prepareDataToHash(params));
    if(givenHash === derivedHash)
    {
      await userService.createUser(userName, givenHash);
      next();
      return;
    }
  } else {
    if(user.hash !== givenHash) {
      const derivedHash = deriveHash(prepareDataToHash(params));
      if(givenHash === derivedHash) {
        await userService.updateHash(userName, givenHash);
        next();
        return;
      }
    } else {
      next();
      return;
    }
  }

  res
    .status(401)
    .json({error: "Please sign in first"});
};

module.exports = {
  checkAuth,
  parseQuery
};
