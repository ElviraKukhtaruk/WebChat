let get_req     = require('../socket/socketRequest');
let logger      = require('../logs/log');
let socketDB    = require('../access/socketIdAccess'); 

module.exports = (socket, io)=>{
try{
   let socket_id = socketDB.get(socket.request.session.current_dialogue_with);
   if (socket_id) io.to(socket_id).emit('user_is_writing'); 
   else socket.emit('error', {mess: 'Uživatel nebyl nalezen'});
}catch(err){
  socket.emit("error", {mess: "Došlo k chybě, restartujte stránku"});
  logger(get_req(socket), 'error', err);
}
}
