let fs = require('fs');
let file = 'logs.txt';

let log = (data)=>{ 
  fs.appendFile(`./logs/${file}`, data, (err) => err ? console.log(err) : null);
}

let log_with_info_text = (req, log_text, date, id)=>{
  console.log(`${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${id} | ${log_text} | ${req.get('User-Agent')}"\n`);
  log(`${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${id} | ${log_text} | ${req.get('User-Agent')}"\n`);
}

module.exports = (req, log_type, log_text)=>{
try{
 let id = 'undefined';
 let now = new Date(); 
 let month = now.getMonth()+1;
 let date = `[${now.getFullYear()}-${month}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

 req.method === 'socket' ? id = req.ids : id = req.sessionID;

 switch(log_type){
   case 'header':
      file = 'logs.txt';
      console.log(`${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${id} | ${req.get('User-Agent')}"\n`);
      log(`${req.ip} --- ${date} "${req.method} ${req.originalUrl} | ${id} | ${req.get('User-Agent')}"\n`);
      break;
    case 'error':
      file = 'error-log.txt';
      log_with_info_text(req, log_text, date, id);
      break;
    case 'info':
      file = 'info-log.txt';
      log_with_info_text(req, log_text, date, id);
      break;
 }
}catch(err){
  console.error(err);
}
}