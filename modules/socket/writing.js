let logger      = require('../logs/log');
let redisStore  = require('../../redis/setAndGet');

module.exports = async(socket, io)=>{
try{
   let user_data = await redisStore.get(socket.request.session.current_dialogue_with, true);
   if(user_data.socket_id) io.to(user_data.socket_id).emit('user_is_writing'); 
}catch(err){
  logger(socket, 'error', err);
}
}
