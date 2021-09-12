let express = require("express");
let router  = express.Router();
let logger  = require('../modules/logs/log');

router.get('/', (req, res) => {
   res.render('main');
});

module.exports = router;