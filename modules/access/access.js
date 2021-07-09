let access = [];

/* В массиве может находится только два объекта 
 (Только два пользователя может находиться в чате одновременно).
 Чтобы отправить сообщение пользователю, нужно иметь одинаковое секретное слово */

module.exports.add = (id, secret_word) => {
  if(access.length <= 1) access.push({id: id, secret_word: secret_word});
  else throw new Error("too many people");
}

module.exports.get = id => {
   return access.filter(obj => obj.id === id ); 
}

module.exports.delete = id => {
   access = access.filter(obj => obj.id !== id );  
}

module.exports.getSecondPerson = id => {
   return access.filter(obj => obj.id !== id );   
}