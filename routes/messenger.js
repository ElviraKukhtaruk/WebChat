let express              = require("express");
let router               = express.Router();
let User                 = require('../modules/schema/User');
let logger               = require('../modules/logs/log');

router.post('/startChat', async(req, res)=>{
try{
    let user = await User.findOne({username: req.body.username});
    if(user && req.session.userID){ 
        req.session.current_dialogue_with = user._id;
        res.sendStatus(200);
        logger(req, 'info', `User start chat with: ${req.body.username}`);
    }else res.status(404).send('User with this username not found or you are not authenticated');
}catch(err){
    res.status(500).send('Something went wrong');
    logger(req, 'error', err);
}
});


module.exports = router;