let session     = require('express-session');
let redisClient = require('../../redis/redis');

module.exports = ()=>{
 return session({
    store: redisClient(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: false,
        httpOnly: true
    }
  });
};