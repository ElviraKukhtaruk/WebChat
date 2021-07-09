let sessionConf = require('../../modules/session/conf');
let get_req     = require('../socket/socketRequest');
let logger      = require('../logs/log');


module.exports.session = ()=>{
    /*Функция-оболочка, чтобы сигнатуры методов совпадали 
    (что бы модули промежуточного программного обеспечения Express были совместимы с Socket.IO)*/
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    return wrap(sessionConf());
}
module.exports.middleware = (socket, next)=>{
    if(socket.request.session.auth){
        next();
        logger(get_req(socket), 'info', `The user has successfully connected to the socket`);
    }else{
        next(new Error("You must be logged in"));
        logger(get_req(socket), 'info', `Session connection failure`);
    }
}