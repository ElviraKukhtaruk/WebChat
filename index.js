let express         = require('express');
let app             = express();
let http            = require('http').Server(app);
let io              = require('socket.io')(http);
let auth_route      = require("./routes/auth"); 
let main_route      = require("./routes/main");
let access          = require('./modules/access/access');
let session         = require('./modules/session/conf');
let accessSocket    = require('./modules/access/accessSocket'); 
let sendMessage     = require('./modules/socket/sendMessage');
let user_is_writing = require('./modules/socket/writing');
let logger          = require('./modules/logs/log');
                      require('dotenv').config();

          

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session());
app.use((req, res, next)=>{ logger(req, 'header'); next(); });
app.use(express.static('www'));
app.use('/', main_route);
app.use('/auth', auth_route);
io.use(accessSocket.session());
io.use(accessSocket.middleware);



io.on('connection', (socket) => {
 if(socket.request.session.auth){
  socket.on('disconnect', () => {
    access.delete(socket.id);
    console.log('user disconnected');
  });
  socket.on('message', (data) => {
    sendMessage(socket, io, data);
  });
  socket.on("writing", ()=>{
    user_is_writing(socket, io);
  });
 }
});



http.listen(process.env.WEB_PORT, process.env.WEB_HOST, () => {
  console.log('server is running');
});