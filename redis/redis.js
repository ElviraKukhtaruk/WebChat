
let redis        = require('redis');
let session      = require('express-session');
let connectRedis = require('connect-redis');
let RedisStore   = connectRedis(session);

module.exports = ()=>{

const redisClient = redis.createClient({
    host: '192.168.0.66',
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err)=>{
  console.error('Redis connect error ' + err);
});

redisClient.on('connect', (err)=>{
  console.log('Redis connected successfully !');
});

return new RedisStore({client: redisClient});
}