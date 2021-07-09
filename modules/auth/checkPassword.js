let crypto = require('crypto');

module.exports = (data)=>{
  let user_crypt_data = crypto.createHash('sha3-512').update(data+process.env.SALT, 'utf-8');
  let user_generate_hash = user_crypt_data.digest('hex');

  let user_data = Buffer.from(user_generate_hash); 
  let passwd_data = Buffer.from(process.env.PASSWORD);

  return crypto.timingSafeEqual(user_data, passwd_data);
  
}