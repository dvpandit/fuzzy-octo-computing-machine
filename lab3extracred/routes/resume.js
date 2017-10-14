var express = require("express");
var router = express.Router();

router.use('/resume', function (req, res, next) {
    var methods = ['GET'];
    var referrer = req.get('referrer');
    if (typeof referrer === 'undefined') {
        var cache = require('../models/cache').cache;
        cache.del(req.session.currentUser.name);
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

router.get('/resume', function (req, res, next) {
    var cache = require('../models/cache').cache;
    var prevState = cache.get(req.session.currentUser.name);
    if (prevState.referrer === 'purchase') {
        req.session.selectedDetails = prevState.purchaseDetails;
        req.session.totalAmtDue = prevState.purchaseDetails.batchTotal;
        res.render('../views/purchase', {
            user: req.session.currentUser,
            selectedBooks: prevState.purchaseDetails.selectedBooks,
            batchTotal: prevState.purchaseDetails.batchTotal
        });
    } else if (prevState.referrer === 'confirm') {
        req.session.confirmDetails = prevState.confirmDetails;
        req.session.totalAmtDue = prevState.amount;
        res.render('../views/confirm', {
            user: req.session.currentUser,
            paymentDetails: prevState.confirmDetails,
            amount: prevState.amount
        });
    }
    console.log("reaches here!!!!!!!!!!!!!");
    cache.del(req.session.currentUser.name);
});

module.exports = router;
