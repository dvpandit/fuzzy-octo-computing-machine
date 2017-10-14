var express = require("express");
var router = express.Router();

router.use('/logout', function (req, res, next) {
    var methods = ['GET'];
    var referrer = req.get('referrer');
    if (typeof referrer === 'undefined') {
        req.session.destroy(function (err) {});
        res.status(404);
        res.render('../views/error404');
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
    var ref = req.get('referrer').split('/')[3];
    var cache = require('../models/cache').cache;
    if (ref === 'purchase' || ref === 'resume') {
        cache.put(req.session.currentUser.name, {
            referrer: 'purchase',
            purchaseDetails: req.session.selectedDetails
        });
    } else if (ref === 'confirm' || ref === 'resume') {
        cache.put(req.session.currentUser.name, {
            referrer: 'confirm',
            confirmDetails: req.session.confirmDetails,
            amount: req.session.totalAmtDue
        });
    }else{
        cache.del(req.session.currentUser.name);
    }

    req.session.destroy(function (err) {});
    res.redirect('/landing');
});

module.exports = router;
