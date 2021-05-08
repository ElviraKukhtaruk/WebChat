let access = [];

module.exports.add = (id, secret_word)=>{
  if(access.length <= 1) access.push({id: id, secret_word: secret_word});
  else throw new Error("too many people");
  console.log(access);
}

module.exports.get = (id, secret_word)=>{
   if(id) return access.filter(obj => { return obj.id == id }); 
   else return access.filter(obj => { return obj.secret_word === secret_word });
}

module.exports.delete = (id, secret_word)=>{
   if(id) access = access.filter(obj =>{ return obj.id !== id }); 
   else access = access.filter(obj =>{ return obj.secret_word !== secret_word });  
}

module.exports.getSecondPerson = (id)=>{
    return access.filter(obj => { return obj.id !== id }); 
}