var mysql =  require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'rentalUser',
    password:'rentalUser',
    database: 'Rentals'
});

db.connect(function(error) {
    if(error) {
        console.log("error while connecting with db.");
    }
});

exports.list = function(req, res) {
    var sql = "SELECT Id, ApartmentName, Location, cast(Visited AS UNSIGNED) AS Visited FROM Rentals.Rental;";
    var rentals = [];
    db.query(sql, function(error, results) { 
        if(error) {
            res.send({"error" : true })
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
    //res.send(JSON.stringify(rentals));
};
exports.markVisited = function(req, res) {
    var sql = "UPDATE Rentals.Rental SET Visited = true  where Rental.id = " + req.params.id ;
    db.query(sql, function(error, results) {
        if(error) {
            res.send({ "error" : true });
        }
        else {
            res.send("success");
        }
    });
};
exports.findById = function(req, res) {
    var sql = "SELECT * FROM Rentals.Rental where Rental.id = " + req.params.id ;
    db.query(sql, function(error, results) {
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
    var sql = "INSERT INTO `Rentals`.`Rental` (`ApartmentName`, `OwnerOrDealer`, `webpage`, `visited`, `RentAmount`, `Location`, `OwnerName`, `OwnerPhone`) VALUES ( '" +
        rental.ApartmentName + "','" +
        rental.OwnerOrDealer+ "','" +
        rental.webpage + "'," +
        rental.visited + ",'" +
        rental.RentAmount + "','" +
        rental.Location + "','" +
        rental.OwnerName + "','" +
        rental.OwnerPhone + "');" ;
    db.query(sql, function(error) {
        if(error) {
            res.send({"error": true});
        } else {
            res.send({"added": true});
        }
    });
};
