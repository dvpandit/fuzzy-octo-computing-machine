var express = require("express");
var router = express.Router();

router.use('/landing', function (req, res, next) {
    var methods = ['GET'];
    if(methods.includes(req.method)){
        next();
    }else{
        res.status(405);
        res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 405</title></head><body><h1>Error 405: Method Not Allowed</h1></body></html>');
    }
    
});

router.get('/list', function(req, res){
    res.status(501);
    res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 501</title></head><body><h1>Error 501: Not Implemented</h1></body></html>');
});

module.exports = router;