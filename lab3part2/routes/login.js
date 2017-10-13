var express = require("express");
var router = express.Router();

router.use('/login', function (req, res, next) {
    var methods = ['GET', 'POST'];
    var allowedPaths = ['landing', 'login'];
    var referrer = req.get('referrer');
    console.log(referrer);
    if (typeof referrer !== 'undefined' && !allowedPaths.includes(referrer.split("/")[3])) {
        res.status(304);
        res.send('');
    } else if (typeof referrer === 'undefined') {
        req.session.destroy(function (err) {});
        res.redirect('/landing');
    } else {
        if (methods.includes(req.method)) {
            next();
        } else {
            res.status(405);
            res.render('../views/error405');
        }
    }
});

router.get('/login', function (req, res) {
    console.log("I am inside login GET");
    var blankName = null;
    var blankPwd = null;
    if (typeof req.session.currentUser === 'undefined') {
        req.session.currentUser = {
            name: req.body.name,
            accessGranted: false,
            passwordIncorrect: false
        };
    }
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/login', {
        user: req.session.currentUser,
        blankName: blankName,
        blankPwd: blankPwd
    });
});

router.post('/login', function (req, res) {
    console.log("I am inside login POST");
    var blankName = null;
    var blankPwd = null;
    if (typeof req.session.currentUser === 'undefined') {
        req.session.currentUser = {
            name: req.body.name,
            accessGranted: false,
            passwordIncorrect: false
        };
    }
    if (req.body.name == req.body.pwd && req.body.name) {
        // Password correct
        console.log("Access Granted");
        req.session.currentUser.accessGranted = true;
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('../views/login', {
            user: req.session.currentUser
        });
    } else {
        // Password incorrect
        console.log("Access denied");
        req.body.name ? blankName = false : blankName = true;
        req.body.pwd ? blankPwd = false : blankPwd = true;
        req.session.currentUser.passwordIncorrect = true;
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('../views/login', {
            user: req.session.currentUser,
            blankName: blankName,
            blankPwd: blankPwd
        });
    }
});

module.exports = router;
