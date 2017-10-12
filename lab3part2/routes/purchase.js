var express = require("express");
var router = express.Router();

function getSelBooksDetails(purchReq, allBooks) {
    var selectedDetails = {};
    selectedDetails.selectedBooks = [];
    selectedDetails.batchTotal = 0;
    allBooks.forEach(function (book) {
        if (typeof purchReq.Books === 'string') {
            if (book.id == purchReq.Books) {
                selectedDetails.selectedBooks = [{
                    name: book.name,
                    quantity: purchReq.Quantity,
                    pricePerUnit: book.price,
                    totalSetPrice: (book.price * purchReq.Quantity).toFixed(2)
                }];
                selectedDetails.batchTotal = (book.price * purchReq.Quantity);
            }
        } else {
            purchReq.Books.forEach(function(requestedBook){
                if (book.id == requestedBook) {
                    selectedDetails.selectedBooks.push({
                        name: book.name,
                        quantity: purchReq.Quantity,
                        pricePerUnit: book.price,
                        totalSetPrice: (book.price * purchReq.Quantity).toFixed(2)
                    });
                    selectedDetails.batchTotal += (book.price * purchReq.Quantity);
                }
            });

        }
    });
    return selectedDetails;
}

router.use('/purchase', function (req, res, next) {
    var methods = ['POST'];
    if (methods.includes(req.method)) {
        next();
    } else {
        res.status(405);
        res.render('../views/error405');
    }

});

router.post('/purchase', function (req, res) {
    var selectedDetails = getSelBooksDetails(req.body, res.locals.books);
    req.session.totalAmtDue = selectedDetails.batchTotal;
    res.render('../views/purchase', {
        user: req.session.currentUser,
        selectedBooks: selectedDetails.selectedBooks,
        batchTotal: selectedDetails.batchTotal
    });
});

module.exports = router;
