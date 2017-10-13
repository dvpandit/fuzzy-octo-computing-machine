var express = require("express");
var router = express.Router();

router.use(function (req, res) {
    res.status(404);
    res.render('../views/error404');
});

module.exports = router;