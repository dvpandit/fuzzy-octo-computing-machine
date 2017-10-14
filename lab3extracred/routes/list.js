var express = require("express");
var router = express.Router();

router.use('/list', function (req, res, next) {
    var methods = ['GET'];
    var referrer = req.get('referrer');
    if (typeof referrer === 'undefined') {
        var cache = require('../models/cache').cache;
        cache.del(req.session.currentUser.name);
        req.session.destroy(function (err) {});
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

router.get('/list', function (req, res) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/list', {
        books: res.locals.books,
        user: req.session.currentUser,
        blankQuantity: false,
        blankBooks: false
    });
});

module.exports = router;
