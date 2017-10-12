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

router.get('/list', function(req, res){
    res.render('../views/list', {books:res.locals.books,user:req.session.currentUser});
});

module.exports = router;