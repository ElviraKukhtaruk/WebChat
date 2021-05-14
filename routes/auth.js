let express            = require("express");
let router             = express.Router();
let session_regenerate = require('../modules/session/regenerate'); 
let access             = require('../modules/access/access');
let checkPasswd        = require('../modules/auth/timingSafeEqual');

router.post('/', async(req, res)=>{
 try{
    console.log(checkPasswd(req.body.password));
    await session_regenerate(req);
    res.render('chat');
 }catch(err){
    console.error(err);
    res.status(500).send('Something went wrong');
 }
});
    
router.post('/connect', (req, res)=>{
 try{
    access.add(req.body.id, req.body.secret_name);
    req.session.socketId = req.body.id;
    req.session.secret_word = req.body.secret_name;
    res.send('success');
 }catch(err){
    if(err.message === "too many people") res.status(403).send("Too many people");
    else res.status(500).send("Something went wrong");
 }
});

module.exports = router;