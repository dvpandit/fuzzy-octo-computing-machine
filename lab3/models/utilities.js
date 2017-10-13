var utilities = {};

utilities.getSelBooksDetails = function(purchReq, allBooks) {
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
        //selectedDetails.batchTotal = parseFloat(selectedDetails.batchTotal).toFixed(2);
    });
    return selectedDetails;
}

module.exports = utilities;