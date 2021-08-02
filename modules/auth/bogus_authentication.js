let fake_hash     = '$2b$10$xGuhlettwphCI3lWsgKuhucvCAdD63RmUhe/86iYXj2Rs6lNVyd4e';
let bcrypt        = require('bcrypt');

module.exports = async(password)=>{
   await bcrypt.compare(password, fake_hash);
   return false;
}