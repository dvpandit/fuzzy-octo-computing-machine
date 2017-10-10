var express = require("express");
var router = express.Router();

router.use(function (req, res) {
    res.status(404);
    res.send('<!DOCTYPE html><html lang="en"><head><title>Error: 404</title></head><body><h1>Error 404: Not Found</h1></body></html>');
});

module.exports = router;