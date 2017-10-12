var express = require("express");
var router = express.Router();

router.use('/confirm', function (req, res, next) {
    var methods = ['POST'];
    if (methods.includes(req.method)) {
        next();
    } else {
        res.status(405);
        res.render('../views/error405');
    }

});

router.post('/confirm', function (req, res) {
    console.log(req.body);
    res.render('../views/confirm', {
        user: req.session.currentUser,
        paymentDetails: req.body,
        amount: req.session.totalAmtDue
    });
});

module.exports = router;
