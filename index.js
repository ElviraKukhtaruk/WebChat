let express              = require('express');
let app                  = express();
let getСertificates      = require('./modules/getCerts/getCerts');
let https                = require('https').Server(getСertificates(), app);
let io                   = require('socket.io')(https);
let auth_route           = require("./routes/auth"); 
let main_route           = require("./routes/main");
let messenger_route      = require('./routes/messenger');
let session              = require('./modules/session/conf');
let accessSocket         = require('./modules/access/accessSocket'); 
let sendMessage          = require('./modules/socket/sendMessage');
let user_is_writing      = require('./modules/socket/writing');
let setConnectionOptions = require('./modules/socket/setConnectionOptions');
let logger               = require('./modules/logs/log');
let get_req              = require('./modules/socket/socketRequest');
                           require('dotenv').config();
let db                   = require('./db/conf');
          

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session());
app.use('/', express.static('www'));
app.use('/static', (req, res, next)=> req.sessionID ? next() : res.sendStatus(404));
app.use('/static', express.static('static'));
app.use((req, res, next)=>{ logger(req, 'header'); next(); });
app.use('/', main_route);
app.use('/auth', auth_route);
app.use('/messenger', messenger_route);
io.use(accessSocket.session());
io.use(accessSocket.middleware);



io.on('connection', async(socket) => {
 if(socket.request.session.userID){
  await setConnectionOptions(socket);
  socket.on('disconnect', async() => {
    console.log('user disconnected');
  });
  socket.on('message', async(data) => {
    await sendMessage(socket, io, data.message);
  });
  socket.on("writing", async()=>{
    await user_is_writing(socket, io);
  });
}
});



https.listen(process.env.WEB_PORT, process.env.WEB_HOST, () => {
  console.log('server is running');
});
