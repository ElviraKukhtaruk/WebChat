const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', function(err){
  console.error(err);
});
db.once('open', function() {
  console.log('MongoDB is Connected!');
});

module.exports = db;