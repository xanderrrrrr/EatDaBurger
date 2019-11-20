var express = require("express");

var router = express.Router();

// import the model to use it's db functions
var burger = require("../models/burger.js");

// create all our routes
router.get("/", function(req, res) {
    burger.all(function(data) {
        var obj = {
            burgers: data
        };
        console.log(obj);
        console.log('something')
        res.render("index", obj)
    });
})

// export routes for server.js to use
module.exports = router;