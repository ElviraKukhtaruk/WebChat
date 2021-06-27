let access = [];

module.exports.add = (id, secret_word)=>{
  if(access.length <= 1) access.push({id: id, secret_word: secret_word});
  else throw new Error("too many people");
}

module.exports.get = (id)=>{
   return access.filter(obj => { return obj.id == id }); 
}

module.exports.delete = (id)=>{
   access = access.filter(obj =>{ return obj.id !== id });  
}

module.exports.getSecondPerson = (id)=>{
   return access.filter(obj => { return obj.id !== id });   
}