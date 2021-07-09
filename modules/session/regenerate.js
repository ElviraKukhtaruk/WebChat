module.exports = async(req)=>{

 return new Promise((resolve, reject)=>{
  req.session.regenerate(err => { 
   if(err) reject(err);
   else req.session.save(err => err ? reject(err) : resolve());
  });
 });
 
}