let fs = require('fs');

module.exports = ()=>{
    return{
        key: fs.readFileSync('./certs/chat.key'),
        cert: fs.readFileSync('./certs/chat.crt')
    };
}