module.exports = (socket)=>{
    let ip, socket_and_session_id, originalUrl, ua;
    let method = 'socket';          
    if(socket.handshake.address) ip = socket.handshake.address;
    if(socket.handshake.url) originalUrl = socket.handshake.url;
    if(socket.handshake.headers['user-agent']) ua = socket.handshake.headers['user-agent'];
    if(socket.request.session.id && socket.id) socket_and_session_id = `${socket.id} | ${socket.request.session.id}`;
    return {ip, originalUrl, method, socket_and_session_id, get: ()=> ua };
}
