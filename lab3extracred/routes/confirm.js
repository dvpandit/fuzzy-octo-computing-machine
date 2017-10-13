var express = require("express");
var router = express.Router();

router.use('/confirm', function (req, res, next) {
    var methods = ['POST'];
    var allowedPaths = ['purchase'];
    var referrer = req.get('referrer');
    console.log(referrer);
    if (typeof referrer === 'undefined' || !allowedPaths.includes(referrer.split("/")[3])) {
        if(typeof referrer === 'undefined'){
            req.session.destroy(function(err) {});
        }
        res.status(304);
        res.redirect('/landing');
    } else {
        if (methods.includes(req.method)) {
            next();
        } else {
            res.status(405);
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.render('../views/error405');
        }
    }
});

router.post('/confirm', function (req, res) {
    console.log(req.body);
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/confirm', {
        user: req.session.currentUser,
        paymentDetails: req.body,
        amount: req.session.totalAmtDue
    });
});

module.exports = router;
