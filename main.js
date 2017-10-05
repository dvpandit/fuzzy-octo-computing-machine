var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();

app.locals.accessGranted = false;
app.locals.passwordIncorrect = false;
app.locals.name = null;
app.locals.booksJSON = '{"books": [{"id": "book1","name": "Book Title","price": "9.99","url": "http://something.org/book"},{"id": "book2","name": "Book Title 2","price":"1.99","url": "http://something.org/book2"}]}';

app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.engine('html', ejs.renderFile);
app.listen(8081);

app.get('/', function(req, res){
  console.log("Redirecting to landing page");
  res.redirect('/landing');
})

app.get('/landing', function(req, res){
  console.log("I am inside landing");
  app.render('landing_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});

app.get('/login', function(req, res){
  console.log("I am inside login GET");
  app.render('login_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});

app.get('/list', function(req, res){
  console.log("I am inside list GET");
  app.render('list_ejs.html', function(err, renderedData){
    res.send(renderedData);
  });
});

app.post('/login', function(req, res){
  console.log("I am inside login POST");
  if (req.body.name == req.body.pwd) {
    // Password correct
    console.log("Access Granted");
    app.locals.accessGranted = true;
    app.locals.name = req.body.name;
    app.render('login_ejs.html', function(err, renderedData){
      res.send(renderedData);
    });
    app.locals.accessGranted = false;
  }
  else {
    // Password incorrect
    console.log("Access denied");
    app.locals.passwordIncorrect = true;
    app.render('login_ejs.html', function(err, renderedData){
      res.send(renderedData);
    });
    app.locals.passwordIncorrect = false;
  }
})
