var express = require("express");

var router = express.Router();

// import the model to use it's db functions
var burger = require("../models/burger.js");

// create all our routes
router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgerObj = {
            burgers: data
        };
        console.log(burgerObj);
        console.log('something')
        res.render("index", burgerObj)
    });
})

router.post("/api/burgers", function(req, res) {
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
        } else {
        res.status(200).end();
        console.log("it was successfully deleted")
        }
    });
    });

// export routes for server.js to use
module.exports = router;