let validateMessage = require('../validation/message');
let isSocketActive  = require('../socket/isSocketActive');
let get_req         = require('../socket/socketRequest');
let logger          = require('../logs/log');
let socketDB        = require('../access/socketIdAccess'); 

module.exports = async(socket, io, data)=>{
try{
   let socket_id = socketDB.get(socket.request.session.current_dialogue_with);
   if(socket_id){
      let is_user_online = await isSocketActive(io, socket_id);
      is_user_online ? io.to(socket_id).emit('answer', validateMessage(data)) : socket.emit("error", {mess: "Uživatel není online"});
      logger(get_req(socket), 'info', `User sent message to id ${socket_id}`);
   }else socket.emit('error', {mess: 'Uživatel nebyl nalezen'});
}catch(err){
   socket.emit("error", {mess: "Došlo k chybě, restartujte stránku"});
   logger(get_req(socket), 'error', err);
}
}
