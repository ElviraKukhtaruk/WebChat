module.exports = async(io, socket_id)=>{
    let active_sockets_list = await io.allSockets();
    return active_sockets_list.has(socket_id);
}