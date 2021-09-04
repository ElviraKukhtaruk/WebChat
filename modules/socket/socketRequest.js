// Функция достает из "socket" объекта нужные свойства,
// которые содержит объект "request", express.js маршрута, 
// для предоставления той же информации, как "request",
// так и "socket" объектом, для функции логирования

module.exports = (socket)=>{
    let ip, sessionID, originalUrl, ua;
    let method = 'socket';          
    if(socket.handshake.address) ip = socket.handshake.address;
    if(socket.handshake.url) originalUrl = socket.handshake.url;
    if(socket.handshake.headers['user-agent']) ua = socket.handshake.headers['user-agent'];
    if(socket.request.session.id && socket.id) sessionID = `${socket.id} | ${socket.request.session.id}`;
    return {ip, originalUrl, method, sessionID, get: ()=> ua };
}
