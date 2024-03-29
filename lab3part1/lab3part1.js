var BooksJSON = '{"books": [' +
    '{"id": "book1","name": "The Image-Guided Surgical Toolkit","price": "0.99","url": "http://www.igstk.org/IGSTK/help/documentation.html"},' +
    '{"id": "book2","name": "Abraham Lincoln","price":"19.95","url": "http://www.learnlibrary.com/abraham-lincoln/lincoln.htm"},' +
    '{"id": "book3","name": "Adventures of Tom Sawyer","price":"10.50","url": "http://www.pagebypagebooks.com/Mark_Twain/Tom_Sawyer/"},' +
    '{"id": "book4","name": "Catcher in the Rye","price":"22.95","url": "https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye"},' +
    '{"id": "book5","name": "The Legend of Sleepy Hollow","price":"15.99","url": "http://www.learnlibrary.com/sleepy-hollow/sleepy-hollow.htm"},' +
    '{"id": "book6","name": "Moby Dick","price":"24.45","url": "https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780"},' +
    '{"id": "book7","name": "Java Programming 101","price":"12.95","url": "https://www.javaworld.com/blog/java-101/"},' +
    '{"id": "book8","name": "Robinson Crusoe","price":"11.99","url": "http://www.learnlibrary.com/rob-crusoe/"},' +
    '{"id": "book9","name": "The Odyssey","price":"32.00","url": "http://classics.mit.edu/Homer/odyssey.html"}' +
    ']}';

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

var landingRoutes = require("./routes/landing");
var loginRoutes = require("./routes/login");
var listRoutes = require("./routes/list");
var err404Route = require("./routes/error404");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.locals.books = JSON.parse(BooksJSON).books;
    next();
});

app.use(landingRoutes);
app.use(loginRoutes);
app.use(listRoutes);

app.use(err404Route);

app.listen(8081);
