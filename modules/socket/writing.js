let access = require('../../modules/access/access');

module.exports = (socket, io)=>{
try{
  if(access.get(socket.id) != ''){
    io.to(access.getSecondPerson(socket.id)[0].id).emit('user_is_writing'); 
  }else socket.emit("error", {mess: "Nejste ve skupině"});
}catch(err){ 
  err.message !== "Cannot read property 'id' of undefined" ? console.error(err) : null;
}
}