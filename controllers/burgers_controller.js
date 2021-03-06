// file, import the following:

// Express
var express = require("express");

var router = express.Router();
//Import model burger.js
var burger = require("../models/burger.js");

// Create the router for the app, and 
// export the router at the end of your file.

router.get("/", function(req, res){
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };

       
        // console.log("data", data);
         //console.log("hbsObject", hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "eaten"
    ], [
        req.body.burger_name, req.body.eaten
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
     
    console.log(" Condition", condition);
    
    burger.update({
        eaten: req.body.eaten
    }, condition, function (result) {
        console.log("result", result.changedRows)
        if (result.changedRows == 0) {
            //If no rows were changed, this indicates no id so display a 404
        return res.status(404).end();
    } else {
        res.status(200).end();
    }
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
          }
    });
});

// Export routes for server.js to use.
module.exports = router;