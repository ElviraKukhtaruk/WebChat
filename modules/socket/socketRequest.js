module.exports = (socket)=>{
    let ip, ids, originalUrl, ua = 'undefined';
    let method = 'socket';          
    if(socket.handshake.address) ip = socket.handshake.address;
    if(socket.handshake.url) originalUrl = socket.handshake.url;
    if(socket.handshake.headers['user-agent']) ua = socket.handshake.headers['user-agent'];
    if(socket.request.session.id && socket.id) ids = `${socket.id} | ${socket.request.session.id}`;
    return {ip, originalUrl, method, ids, get:()=>{ return ua; }};
}
