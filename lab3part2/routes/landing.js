var express = require("express");
var router = express.Router();

router.use('/landing', function (req, res, next) {
    var methods = ['GET'];
    if(methods.includes(req.method)){
        next();
    }else{
        res.status(405);
        res.render('../views/error405');
    }
    
});

router.get('/landing', function(req, res){
  console.log("I am inside landing");
  res.render('../views/landing', {books:res.locals.books});
});

module.exports = router;