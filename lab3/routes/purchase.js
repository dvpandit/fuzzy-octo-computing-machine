var express = require("express");
var router = express.Router();

var utilitis = require('../models/utilities');

router.use('/purchase', function (req, res, next) {
    var methods = ['POST'];
    var allowedPaths = ['list', 'purchase'];
    var referrer = req.get('referrer');
    console.log(referrer);
    if (typeof referrer === 'undefined' || !allowedPaths.includes(referrer.split("/")[3])) {
        if(typeof referrer === 'undefined'){
            req.session.destroy(function(err) {});
        }
        res.status(304);
        res.redirect('/landing');
    } else if (!req.body.Quantity || !req.body.Books) {
      var blankQuantity = null;
      var blankBooks = null;
      req.body.Quantity ? blankQuantity = false : blankQuantity = true;
      req.body.Books ? blankBooks = false : blankBooks = true;
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.render('../views/list', {
          books: res.locals.books,
          user: req.session.currentUser,
          blankQuantity: blankQuantity,
          blankBooks: blankBooks
      });
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

router.post('/purchase', function (req, res) {
    var selectedDetails = utilitis.getSelBooksDetails(req.body, res.locals.books);
    req.session.totalAmtDue = selectedDetails.batchTotal;
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/purchase', {
        user: req.session.currentUser,
        selectedBooks: selectedDetails.selectedBooks,
        batchTotal: selectedDetails.batchTotal
    });
});

module.exports = router;
