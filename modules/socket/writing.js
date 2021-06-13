let access = require('../../modules/access/access');

module.exports = (socket, io)=>{
try{
  if(access.get(socket.id) != ''){
   let second_person_id = access.getSecondPerson(socket.id)[0].id;
   let second_person_secret_word = access.getSecondPerson(socket.id)[0].secret_word; 
   let current_person_secret_word = access.get(socket.id)[0].secret_word;
   if(second_person_secret_word === current_person_secret_word){
      io.to(second_person_id).emit('user_is_writing'); 
   }
  }
}catch(err){ 
  err.message !== "Cannot read property 'id' of undefined" ? console.error(err) : null;
}
}