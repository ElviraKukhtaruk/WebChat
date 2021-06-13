let access = require('../../modules/access/access');
let validateMessage = require('../validation/message');

module.exports = (socket, io, data)=>{
try{
   let second_person_id = access.getSecondPerson(socket.id)[0].id;
   let second_person_secret_word = access.getSecondPerson(socket.id)[0].secret_word; 
   let current_person_secret_word = access.get(socket.id)[0].secret_word;
   if(access.get(socket.id) != '' && second_person_secret_word === current_person_secret_word){
      console.log(validateMessage(data.message));
      io.to(second_person_id).emit('answer', validateMessage(data.message));
   }else socket.emit("error", {mess: "Nejste ve skupině, nebo sekretní slovo jiného uživatele je jiné"});
}catch(err){
  if(err.message === "Cannot read property 'id' of undefined") socket.emit("error", {mess: "Jiný uživatel nebyl nalezen"});
  else socket.emit("error", "");
}
}