let express      = require('express');
let app          = express();
let http         = require('http').Server(app);
let io           = require('socket.io')(http);
let auth_route   = require("./routes/auth"); 
let main_route   = require("./routes/main");
let access       = require('./modules/access/access');
let sessionConf  = require('./modules/session/conf');
let accessSocket = require('./modules/access/accessSocket'); 
let sendMessage  = require('./modules/socket/sendMessage');
let writing      = require('./modules/socket/writing');
                   require('dotenv').config();


app.use(express.static('www'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(sessionConf());
app.use('/', main_route);
app.use('/auth', auth_route);

io.use(accessSocket.session());
io.use(accessSocket.middleware);



io.on('connection', (socket) => {
  
  socket.on('disconnect', () => {
    access.delete(socket.id);
    console.log('user disconnected');
  });
  socket.on('message', (data) => {
    sendMessage(socket, io, data);
  });
  socket.on("writing", ()=>{
    writing(socket, io);
  });

});



http.listen(3000, '192.168.0.32', () => {
  console.log('server is running');
});