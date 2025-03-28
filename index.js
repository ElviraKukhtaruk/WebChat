let express              = require('express');
let app                  = express();
let getСertificates      = require('./modules/getCerts/getCerts');
let https                = require('https').Server(getСertificates(), app);
let io                   = require('socket.io')(https);
let helmet               = require('helmet');
let helmetOptions        = require('./modules/middlewares/helmetOptions');
let cacheControl         = require('./modules/middlewares/cacheControl');
let auth_route           = require("./routes/auth"); 
let main_route           = require("./routes/main");
let messenger_route      = require('./routes/messenger');
let session              = require('./modules/session/conf');
let accessSocket         = require('./modules/access/accessSocket'); 
let sendMessage          = require('./modules/socket/sendMessage');
let user_is_writing      = require('./modules/socket/writing');
let redisStore           = require('./redis/setAndGet');
let logger               = require('./modules/logs/log');
                           require('dotenv').config();
let db                   = require('./db/conf');


app.use(cacheControl);
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://192.168.0.66;");
  next();
});      
app.use(helmet(helmetOptions));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session());
app.use((req, res, next)=>{ logger(req, 'header'); next(); });
app.use('/static', (req, res, next)=> req.sessionID ? next() : res.sendStatus(404));
app.use('/static', express.static('static'));
app.use('/', main_route);
app.use('/auth', auth_route);
app.use('/messenger', messenger_route);
io.use(accessSocket.session());
io.use(accessSocket.middleware);




io.on('connection', (socket) => {
try{
  socket.on('disconnect', () => logger(socket, 'info', 'User disconnected'));
  
  socket.on('getPublicKey', async(callback)=>{
    let user_data = await redisStore.get(socket.request.session.current_dialogue_with, true);
    callback(user_data.publicKey);
  });

  socket.on('message', async(data) => await sendMessage(socket, io, data));
  
  socket.on("writing", () => user_is_writing(socket, io));
  
}catch(err){
  socket.emit("error", {mess: "Došlo k chybě, restartujte stránku"});
  logger(socket, 'error', err);
}
});



https.listen(8080, '0.0.0.0', () => {
  console.log('server is running');
});
