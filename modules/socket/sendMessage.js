let access          = require('../../modules/access/access');
let validateMessage = require('../validation/message');
let get_req         = require('./socketRequest');
let logger          = require('../logs/log');


module.exports = (socket, io, data)=>{
try{
   let second_person_id = access.getSecondPerson(socket.id)[0].id,
       second_person_secret_word = access.getSecondPerson(socket.id)[0].secret_word, 
       current_person_secret_word = access.get(socket.id)[0].secret_word,
       message = validateMessage(data.message);
   if(access.get(socket.id) != '' && second_person_secret_word === current_person_secret_word){
      io.to(second_person_id).emit('answer', message);
      logger(get_req(socket), 'info', `User send message: ${message} to id: ${second_person_id}`);
   }else{
      socket.emit("error", {mess: "Nejste ve skupině, nebo sekretní slovo jiného uživatele je jiné"});
      logger(get_req(socket), 'info', `Refusal to send user\'s message, sec_word: ${current_person_secret_word}`);
   }
}catch(err){
  if(err.message === "Cannot read property 'id' of undefined"){
     socket.emit("error", {mess: "Jiný uživatel nebyl nalezen"});
     logger(get_req(socket), 'error', err);
  }else{ 
     socket.emit("error", "");
     logger(get_req(socket), 'error', err);
  }
}
}