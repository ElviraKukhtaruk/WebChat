let access = require('../../modules/access/access');
let validateMessage = require('../validation/message');
let req          = require('./socketRequest');
let logger       = require('../logs/log');

module.exports = (socket, io, data)=>{
try{
   let second_person_id = access.getSecondPerson(socket.id)[0].id;
   let second_person_secret_word = access.getSecondPerson(socket.id)[0].secret_word; 
   let current_person_secret_word = access.get(socket.id)[0].secret_word;
   let message = validateMessage(data.message);
   if(access.get(socket.id) != '' && second_person_secret_word === current_person_secret_word){
      io.to(second_person_id).emit('answer', message);
      logger(req(socket), 'info', `User send message: ${message} to id: ${second_person_id}`);
   }else{
      socket.emit("error", {mess: "Nejste ve skupině, nebo sekretní slovo jiného uživatele je jiné"});
      logger(req(socket), 'info', `Refusal to send user\'s message, sec_name: ${current_person_secret_word}`);
   }
}catch(err){
  if(err.message === "Cannot read property 'id' of undefined"){
     socket.emit("error", {mess: "Jiný uživatel nebyl nalezen"});
     logger(req(socket), 'error', err);
  }else{ 
     socket.emit("error", "");
     console.log(err);
     logger(req(socket), 'error', err);
  }
}
}