let User = require('../schema/User');

module.exports = async(user_id)=>{
    let user = await User.findById(user_id);
    return user ? user.socket_id : null;
}