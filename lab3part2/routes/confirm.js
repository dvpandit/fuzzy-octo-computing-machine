var express = require("express");
var router = express.Router();

router.use('/confirm', function (req, res, next) {
    var methods = ['POST'];
    if (methods.includes(req.method)) {
        next();
    } else {
        res.status(405);
        res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 405</title></head><body><h1>Error 405: Method Not Allowed</h1></body></html>');
    }

});

router.post('/confirm', function (req, res) {
    console.log(req.body);
    res.render('../views/confirm', {
        user: req.session.currentUser,
        paymentDetails: req.body
    });
});

module.exports = router;
