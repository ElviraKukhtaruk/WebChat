let sessionConf = require('../../modules/session/conf');

module.exports.session = ()=>{
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    return wrap(sessionConf());
}
module.exports.middleware = (socket, next)=>{
    if(socket.request.session) next();
    else next(new Error("Thou shall not pass"));
}