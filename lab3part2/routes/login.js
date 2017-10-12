var express = require("express");
var router = express.Router();

router.use('/login', function (req, res, next) {
    var methods = ['GET', 'POST'];
    var referrer = req.get('referrer');
    if (!referrer) {
      res.status(304);
      res.redirect('/landing');
    }
    else {
      if(methods.includes(req.method)){
          next();
      }else{
          res.status(405);
          res.render('../views/error405');
      }
    }
});

router.delete('/login', function (req, res) {
    res.status(405);
    res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 405</title></head><body><h1>Error 405: Method Not Allowed</h1></body></html>');
});

router.get('/login', function (req, res) {
    console.log("I am inside login GET");
    req.session.currentUser = {
        name: req.body.name,
        accessGranted: false,
        passwordIncorrect: false
    };
    res.render('../views/login', {user:req.session.currentUser});
});

router.post('/login', function (req, res) {
    console.log("I am inside login POST");
    req.session.currentUser = {
        name: req.body.name,
        accessGranted: false,
        passwordIncorrect: false
    };
    if (req.body.name == req.body.pwd) {
        // Password correct
        console.log("Access Granted");
        req.session.currentUser.accessGranted = true;
        res.render('../views/login', {user:req.session.currentUser});
    } else {
        // Password incorrect
        console.log("Access denied");
        req.session.currentUser.passwordIncorrect = true;
        res.render('../views/login', {user:req.session.currentUser});
    }
});

module.exports = router;
