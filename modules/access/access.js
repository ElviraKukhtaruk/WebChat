let access = [];

module.exports.add = (id, secret_word)=>{
  if(access.length <= 1) access.push({id: id, secret_word: secret_word});
  else throw new Error("too many people");
  console.log(access);
}

module.exports.get = (id)=>{
   return access.filter(obj => { return obj.id == id }); 
}

module.exports.delete = (id)=>{
   access = access.filter(obj =>{ return obj.id !== id });  
}

module.exports.getSecondPerson = (id, secret_word)=>{
   return access.filter(obj => { return obj.id !== id });   
}