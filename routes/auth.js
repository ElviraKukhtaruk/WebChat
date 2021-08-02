let express              = require("express");
let router               = express.Router();
let session_regenerate   = require('../modules/session/regenerate'); 
let authenticate         = require('../modules/auth/authenticate');
let logger               = require('../modules/logs/log');

router.post('/', async(req, res)=>{
 try{
   let password = req.body.password, name = req.body.name;
   let authenticated_user = await authenticate(password, name);
   if(authenticated_user){
      await session_regenerate(req);
      req.session.userID = authenticated_user;
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
    

router.post('/message', (req, res)=>{
  console.log(req.body);
});

router.get('/log_out', (req, res)=>{
  req.session.destroy((err)=>{ 
    if(err){ 
      res.status(500).send("Something went wrong"); 
      logger(req, 'error', err);
    }else res.sendStatus(200);
  });
});

module.exports = router;