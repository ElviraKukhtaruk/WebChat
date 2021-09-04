let sessionConf   = require('../../modules/session/conf');
let logger        = require('../logs/log');
let redisStore    = require('../../redis/setAndGet');

module.exports.session = ()=>{
    // Функция-оболочка, чтобы сигнатуры методов совпадали 
    // (что бы модули промежуточного программного обеспечения Express были совместимы с Socket.IO)
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    return wrap(sessionConf());
}
module.exports.middleware = async(socket, next)=>{
    if(socket.request.session.userID){
        await redisStore.set(socket.request.session.userID, {
            socket_id: socket.id, 
            publicKey: socket.handshake.auth.publicKey
        }, true);
        next();
        logger(socket, 'info', `The user has successfully connected to the socket`);
    }else{
        next(new Error("You must be logged in"));
        logger(socket, 'info', `Session connection failure`);
    }
}