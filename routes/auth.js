let express            = require("express");
let router             = express.Router();
let session_regenerate = require('../modules/session/regenerate'); 
let access             = require('../modules/access/access');
let checkPasswd        = require('../modules/auth/checkPassword');
let checkName          = require('../modules/auth/checkName');
let checkId            = require('../modules/validation/auth');
let logger             = require('../modules/logs/log');

router.post('/', async(req, res)=>{
 try{
   let password = req.body.password, name = req.body.name;
   if(typeof password==='string' && typeof name==='string' && checkName(name) && checkPasswd(password)){
      await session_regenerate(req);
      req.session.auth = true;
      res.render('chat');
      logger(req, 'info', `User is logged in`);
   }else{ 
      res.status(403).send('Špatné heslo nebo jméno'); 
      logger(req, 'info', `User entered incorrect data`);
   }
 }catch(err){
    res.status(500).send('Something went wrong');
    logger(req, 'error', err);
 }
});

router.get('/', (req, res)=>{
  res.render('chat');
});
    
router.post('/connect', (req, res)=>{
 try{
   if(req.session.auth && typeof req.body.id==='string' && typeof req.body.secret_name==='string'){
    let id = checkId(req.body.id), secret_name = req.body.secret_name;
    access.add(id, secret_name);
    req.session.socketId = id, req.session.secret_word = secret_name;
    res.send('success');
    logger(req, 'info', `User has been added to the db, socket id: ${id}`);
   }else{ 
     res.status(403).send('Nejste přihlášeni nebo uvedené informace nejsou spravná');
     logger(req, 'error', `User could not be added to the database: id: ${req.body.id}`);   
   }
 }catch(err){
    if(err.message === "too many people"){
      res.status(403).send("V chatu už jsou 2 osoby");
      logger(req, 'error', err);
    }else{ 
      res.status(500).send("Něco špatně, zkuste se přihlásit znova");
      logger(req, 'error', err);   
    }
 }
});

router.get('/log_out', (req, res)=>{
  req.session.destroy((err)=>{ 
    if(err){ 
      res.status(500).send("Something went wrong"); 
      logger(req, 'error', err);
    }else res.send("success");
  });
});

module.exports = router;