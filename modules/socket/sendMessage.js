let validate = require('../validation/message');
let isSocketActive  = require('../socket/isSocketActive');
let logger          = require('../logs/log');
let redisStore      = require('../../redis/setAndGet');

module.exports = async(socket, io, data)=>{
try{
  let user_data = await redisStore.get(socket.request.session.current_dialogue_with, true);
  let socket_id = user_data.socket_id;
   if(socket_id){
      let is_user_online = await isSocketActive(io, socket_id);
      is_user_online ? io.to(socket_id).emit('answer', data) : socket.emit("error", {mess: "Uživatel není online"});
      logger(socket, 'info', `User sent message to id ${socket_id}`);
   }else socket.emit('error', {mess: 'Uživatel nebyl nalezen, možna není online'});
}catch(err){
   socket.emit("error", {mess: "Došlo k chybě, restartujte stránku"});
   logger(socket, 'error', err);
}
}
