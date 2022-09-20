const redis = require("redis");
const KEYS = require("../config/keys");

const redisClient = redis.createClient({
  host: KEYS.redisHost,
  port: KEYS.redisPort,
  no_ready_check: true,
  auth_pass: KEYS.redisPassword
});

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});


module.exports = redisClient;

