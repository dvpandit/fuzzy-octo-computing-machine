var express = require("express");
var router = express.Router();

router.use('/logout', function (req, res, next) {
    var methods = ['GET'];
    var referrer = req.get('referrer');
    if (typeof referrer === 'undefined') {
        req.session.destroy(function (err) {});
        res.status(405);
        res.render('../views/error405');
    } else {
        if (methods.includes(req.method)) {
            next();
        } else {
            res.status(405);
            res.render('../views/error405');
        }
    }
});

router.get('/logout', function (req, res) {
    req.session.currentUser = undefined;
    res.redirect('/landing');
});

module.exports = router;
