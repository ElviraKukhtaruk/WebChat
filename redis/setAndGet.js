let { promisify } = require("util");
let redisClient   = require('./redis').redisClient();
let setAsync      = promisify(redisClient.set).bind(redisClient);
let getAsync      = promisify(redisClient.get).bind(redisClient);

module.exports.get = async (value, isObject) => {
    return isObject ? JSON.parse(await getAsync(value)) : await getAsync(value);
}
module.exports.set = async (key, value, isObject) =>{
     return isObject ? await setAsync(key, JSON.stringify(value)) : await setAsync(key, value); 
}