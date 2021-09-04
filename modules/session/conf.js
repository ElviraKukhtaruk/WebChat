let session     = require('express-session');
let redisClient = require('../../redis/redis');

module.exports = ()=>{
 return session({
    name: 'hello_world',
    store: redisClient.sessionStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: true,
        httpOnly: true,
        sameSite: true
    }
  });
};