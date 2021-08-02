let bcrypt               = require('bcrypt');
let User                 = require('../schema/User');
let bogus_authentication = require('../auth/bogus_authentication');


module.exports = async(password, name)=>{
  if(typeof password==='string' && typeof name==='string'){
     let user = await User.findOne({username: name});
     if (user) return await bcrypt.compare(password, user.password) ? user._id : false;  
     else return await bogus_authentication(password);
  }
}