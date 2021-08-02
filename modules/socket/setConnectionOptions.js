let User = require('../schema/User');

module.exports = async(socket)=>{
   let user = await User.findById(socket.request.session.userID);
       user.socket_id = socket.id;
       await user.save();
}