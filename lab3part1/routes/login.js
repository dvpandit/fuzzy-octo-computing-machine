var express = require("express");
var router = express.Router();

router.use('/login', function (req, res, next) {
    var methods = ['GET', 'POST'];
    if(methods.includes(req.method)){
        next();
    }else{
        res.status(405);
        res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 405</title></head><body><h1>Error 405: Method Not Allowed</h1></body></html>');
    }
    
});

router.delete('/login', function (req, res) {
    res.status(405);
    res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 405</title></head><body><h1>Error 405: Method Not Allowed</h1></body></html>');
});

router.get('/login', function (req, res) {
    console.log("I am inside login GET");
    user = {
        name: req.body.name,
        accessGranted: false,
        passwordIncorrect: false
    };
    res.render('../views/login', user);
});

router.post('/login', function (req, res) {
    console.log("I am inside login POST");
    user = {
        name: req.body.name,
        accessGranted: false,
        passwordIncorrect: false
    };
    if (req.body.name == req.body.pwd) {
        // Password correct
        console.log("Access Granted");
        user.accessGranted = true;
        res.render('../views/login', user);
    } else {
        // Password incorrect
        console.log("Access denied");
        user.passwordIncorrect = true;
        res.render('../views/login', user);
    }
});

module.exports = router;
