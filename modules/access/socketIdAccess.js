let socketIDDB = new Map();

module.exports.add = (user_id, socket_id) => socketIDDB.set(user_id, socket_id);
module.exports.delete = (user_id) => socketIDDB.delete(user_id);
module.exports.get = (user_id) => socketIDDB.get(user_id);