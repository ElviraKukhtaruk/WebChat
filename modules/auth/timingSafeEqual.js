let crypto = require('crypto');

module.exports = (data)=>{
  let user_crypt_data = crypto.createHash('sha512').update(data, 'utf-8');
  let user_generate_hash = user_crypt_data.digest('hex');

  let passwd_crypt_data = crypto.createHash('sha512').update(process.env.PASSWORD, 'utf-8');
  let passwd_generate_hash = passwd_crypt_data.digest('hex');

  let user_data = Buffer.from(user_generate_hash); 
  let passwd_data = Buffer.from(passwd_generate_hash);


  console.log('hash a: '+ user_data);
  console.log('hash b: '+ passwd_data);

  return user_data.length === passwd_data.length && crypto.timingSafeEqual(user_data, passwd_data);
  
}