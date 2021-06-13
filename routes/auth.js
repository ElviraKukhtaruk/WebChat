let express            = require("express");
let router             = express.Router();
let session_regenerate = require('../modules/session/regenerate'); 
let access             = require('../modules/access/access');
let checkPasswd        = require('../modules/auth/checkPassword');
let checkName          = require('../modules/auth/checkName');
let checkId            = require('../modules/validation/auth');

router.post('/', async(req, res)=>{
 try{
   let password = req.body.password, name = req.body.name;
   if(typeof password==='string' && typeof name==='string' && checkName(name) && checkPasswd(password)){
    await session_regenerate(req);
    req.session.auth = true;
    res.render('chat');
   }else res.status(403).send('Špatné heslo nebo jméno');
 }catch(err){
    console.error(err);
    res.status(500).send('Something went wrong');
 }
});

router.get('/', (req, res)=>{
  res.render('chat');
});
    
router.post('/connect', (req, res)=>{
 try{
   if(req.session.auth){
    access.add(checkId(req.body.id), req.body.secret_name);
    req.session.socketId = checkId(req.body.id);
    req.session.secret_word = req.body.secret_name;
    res.send('success');
   }else res.status(200).send('Nejste přihlášeni');
 }catch(err){
    if(err.message === "too many people") res.status(403).send("V chatu už jsou 2 osoby");
    else res.status(500).send("Něco špatně, zkuste se přihlásit znova");
 }
});

router.get('/log_out', (req, res)=>{
  req.session.destroy((err)=> err ? res.status(500).send("Something went wrong") : res.send("success"));
});

module.exports = router;