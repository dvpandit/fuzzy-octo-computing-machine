var express = require("express");
var router = express.Router();

router.use('/add_book', function (req, res, next) {
    var methods = ['GET', 'POST'];
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

router.use('/del_book', function (req, res, next) {
    var methods = ['GET', 'POST'];
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

router.get('/add_book', function (req, res) {
    console.log("Inside add book GET");
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/add_book', {
        books: res.locals.books,
        user: req.session.currentUser,
        blankQuantity: false,
        blankBooks: false
    });
});

router.post('/add_book', function (req, res) {
    console.log("Inside add book GET");
    res.locals.books.push({
      "id": req.body.Quantity[0],
      "name": req.body.Quantity[1],
      "price": req.body.Quantity[2],
      "url": req.body.Quantity[3]
    });
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/landing', {
        books: res.locals.books
    });
});

router.get('/del_book', function (req, res) {
    console.log("Inside del book GET");
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/del_book', {
        books: res.locals.books,
        user: req.session.currentUser,
        blankQuantity: false,
        blankBooks: false
    });
});

router.post('/del_book', function (req, res) {
    console.log("Inside del book GET");
    var copyBooks = res.locals.books;
    var removeIndex = [];
    for (var i in copyBooks) {
      if (req.body.Books.includes(copyBooks[i].id)) {
        removeIndex.push(i);
      }
    }
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      res.locals.books.splice(removeIndex[i],1);
    }
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('../views/landing', {
        books: res.locals.books
    });
});

module.exports = router;
