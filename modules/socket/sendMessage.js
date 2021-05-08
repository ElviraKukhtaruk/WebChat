let access = require('../../modules/access/access');

module.exports = (socket, io, data)=>{
try{
   if(access.get(socket.id) != ''){
       io.to(access.getSecondPerson(socket.id)[0].id).emit('answer', data.message); 
   }else socket.emit("error", {mess: "Nejste ve skupině"});
}catch(err){
  if(err.message === "Cannot read property 'id' of undefined"){
    socket.emit("answer", "Jiný uživatel nebyl nalezen");
  }else socket.emit("error", "");
}
}