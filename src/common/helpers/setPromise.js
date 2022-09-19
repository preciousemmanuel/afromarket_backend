const redisClient = require("./redis");

exports.generateTokenAndStore = (key,result) => {
  redisClient.set(key, JSON.stringify(result), "EX", "1800", () => {});
  return result;
};


