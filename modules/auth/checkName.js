let crypto = require('crypto');

module.exports = (name)=>{
    return name.length === process.env.NAME.length && crypto.timingSafeEqual(Buffer.from(name), Buffer.from(process.env.NAME));
}