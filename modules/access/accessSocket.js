let sessionConf  = require('../../modules/session/conf');
let req          = require('../socket/socketRequest');
let logger       = require('../logs/log');


module.exports.session = ()=>{
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    return wrap(sessionConf());
}
module.exports.middleware = (socket, next)=>{
    if(socket.request.session.auth){
        next();
        logger(req(socket), 'info', `The user has successfully connected to the socket`);
    }else{
        next(new Error("Thou shall not pass"));
        logger(req(socket), 'info', `Session connection failure`);
    }
}