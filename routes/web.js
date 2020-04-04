const express = require('express');
const router = express.Router();
 commonFunc=require('../src/routers/commonFunc')
// const City=require('../src/models/city');
//===========Dashboard========================



// END OF CUSTOM MIDDLEWARE
router.get('/', (req,res,next) => {
    return res.render('index.hbs');

});


module.exports = router;