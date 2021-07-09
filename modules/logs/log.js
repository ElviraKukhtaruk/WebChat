let fs   = require('fs');
let file = 'logs.txt';

let log = (req, log_text, date, id)=>{
  let data = `${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${id} | ${log_text} | ${req.get('User-Agent')}"\n`;
  console.log(data);
  fs.appendFile(`./logs/${file}`, data, err => err ? console.log(err) : null);
}

module.exports = (req, log_type, log_text)=>{
try{
 let id = 'undefined', now = new Date();
 let date =`[${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

 req.method === 'socket' ? id = req.socket_and_session_id : id = req.sessionID;

 switch(log_type){
   case 'header':
      file = 'logs.txt';
      log(req, 'header log', date, id);
      break;
    case 'error':
      file = 'error-log.txt';
      log(req, log_text, date, id);
      break;
    case 'info':
      file = 'info-log.txt';
      log(req, log_text, date, id);
      break;
 }
}catch(err){
  console.error(err);
}
}