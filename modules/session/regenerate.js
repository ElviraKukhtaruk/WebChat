module.exports = async(req)=>{
 return new Promise((resolve, reject)=>{
  req.session.regenerate(err => err ? reject(err) : req.session.save(err => err ? reject(err) : resolve()));
 });
}