let fs                       = require('fs');
let get_request_from_socket  = require('../socket/socketRequest');

let file = 'logs.txt';

let log = (req, log_text, date)=>{
  let data = `${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${req.sessionID} | ${log_text} | ${req.get('User-Agent')}"\n`;
  fs.appendFile(`./logs/${file}`, data, err => err ? console.log(err) : null);
}

module.exports = (req, log_type, log_text)=>{
try{
 let now = new Date(),
 date =`[${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
 
 //Если запрос содержит значение "req.id", значит это socket запрос 
 if(req.id) req = get_request_from_socket(req);

 switch(log_type){
   case 'header':
      file = 'logs.txt';
      log(req, 'header log', date);
      break;
    case 'error':
      file = 'error-log.txt';
      log(req, log_text, date);
      break;
    case 'info':
      file = 'info-log.txt';
      log(req, log_text, date);
      break;
 }
}catch(err){
  console.error(err);
}
}