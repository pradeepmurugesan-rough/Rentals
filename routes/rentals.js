var mysql =  require('mysql');
var app = require("../app");
var db = app.db;
//var config = app.get('db');
//var db = mysql.createConnection( config );

/*db.connect(function(error) {
    if(error) {
        console.log("error while connecting with db.");
    }
    else {
        var sql = "use " + config.name;
        db.query(sql, function(error){
            if(error) {
                console.log("Coudn't use the DB " + config.name);
            }
        });
    }
});*/

exports.list = function(req, res) {
    var sql = "SELECT Id, ApartmentName, Location, cast(Visited AS UNSIGNED) AS Visited FROM Rental;";
    var rentals = [];
    req.db.query(sql, function(error, results) { 
        if(error) {
            res.send({"error" : true })
        }
        else {
            res.send(results);
        }
    });
    //res.send(JSON.stringify(rentals));
};
exports.markVisited = function(req, res) {
    var sql = "UPDATE Rental SET Visited = true  where Rental.id = " + req.params.id ;
    req.db.query(sql, function(error, results) {
        if(error) {
            res.send({ "error" : true });
        }
        else {
            res.send("success");
        }
    });
};
exports.findById = function(req, res) {
    var sql = "SELECT * FROM Rental where Rental.id = " + req.params.id ;
    req.db.query(sql, function(error, results) {
        if(error) {
            res.send({ "error" : true });
        }
        else {
            res.send(results);
        }
    });
};

exports.addRental = function(req, res) {
    rental = req.body;
    var sql = "INSERT INTO `Rental` (`ApartmentName`, `OwnerOrDealer`, `webpage`, `visited`, `RentAmount`, `Location`, `OwnerName`, `OwnerPhone`) VALUES ( '" +
        rental.ApartmentName + "','" +
        rental.OwnerOrDealer+ "','" +
        rental.webpage + "'," +
        rental.visited + ",'" +
        rental.RentAmount + "','" +
        rental.Location + "','" +
        rental.OwnerName + "','" +
        rental.OwnerPhone + "');" ;
    req.db.query(sql, function(error) {
        if(error) {
            res.send({"error": true});
        } else {
            res.send({"added": true});
        }
    });
};
