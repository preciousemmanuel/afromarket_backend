const { promisify } = require("util");
const redisClient = require("./redis");

exports.redisGetAsync = promisify(redisClient.get).bind(redisClient);