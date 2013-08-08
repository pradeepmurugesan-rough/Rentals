var Rentals = {
     addTemplates: function(){
          ich.addTemplate("rentals", "<table class=\"table table-hover\"><thead><tr>  <td>Rentals</td>  </tr>  </thead> <tbody>  {{#rentals}}  <tr id=\"{{id}}\"> <td>{{ApartmentName}} - {{Location}}</td> </tr>{{/rentals}} </tbody>  </table>");
          ich.addTemplate("newRental", "<div><span id=\"error\"></span> <input id='apartmentName' placeholder='Apartment Name'><br> <input id='ownerType' placeholder='Owner/Broker'><br>  <input id='rent' placeholder='Rent'><br> <input id='ownerName' placeholder='Owner Name'><br>  <input id='ownerPhone' placeholder='Owner Phone'><br>  <input id='location' placeholder='Location'><br>  <input id='webPage' placeholder='Ad Page Url'><br> <button id=\"create\">Create</button></div>");
     },

    init: function(){
        Rentals.addTemplates();
        Rentals.getRentals();
        Rentals.bindEvents();
    },
    bindEvents: function() {
        $(".nav").click(function(event){
            event.preventDefault();
            if($(event.target).parent().is("#newRental")) {
                Rentals.createRental();
            } 
            else if($(event.target).parent().is("#rentals")) {
                Rentals.getRentals();
            }
        });
        $("#contentArea").click(function(event){ 
            if($(event.target).is("#create")){
                Rentals.postRental();
            }
            else if($(event.target).is("td")) {
                rentalId = $(event.target).parent().attr("id");
                Rentals.getRental(rentalId);
            }
            else if($(event.target).is("#visited"))
            {
                rentalId = $(event.target).parent().attr("id");
                Rentals.markVisited(rentalId);               
            }        
        });
    },
    markVisited: function(id) {
        $.get("/visited/" + id, function(){
            Rentals.getRentals();
            Rentals.getRental(id);
        });
    },
    postRental: function() {
        if(Rentals.validateData()) {
            rental = Rentals.collectData();
            $.ajax({
                type: "POST",
                url: "/new",
                data: rental,
                success: function(data) { Rentals.getRentals(); },
                dataType: "json"
            });
        }
        else {
            $("#error").html("location and phonenumber are mandatory");
            $("#location").focus();
        }
    },
    collectData: function() {
        var rental = {};
        rental["ApartmentName"] = $("#apartmentName").val();
        rental["Location"] = $("#location").val();
        rental["OwnerOrDealer"] = $("#ownerType").val();
        rental["OwnerName"] = $("#ownerName").val();
        rental["RentAmount"] = $("#rent").val();
        rental["webpage"] = $("#webPage").val();
        rental["OwnerPhone"] = $("#ownerPhone").val();
        rental["visited"] = false;
        return rental;

    },
    getRentals: function() {
        Rentals.toggleActive("rentals");
        $.getJSON("/rentals", function(data){
            var view = {"rentals": data};
            $("#contentArea").html(templatizer.rentals(view));
            $("#apartmentDetails").html(templatizer.selectedRental({selectedRental: null}));
        });
    },
    getRental: function(id) {
        $.getJSON("/rentals/" + id , function(data){
            var rental = data[0];
            if(rental.visited[0]) {
                rental.visited = true;
            }
            else {
                rental.visited = false;
            }
            var view = {"selectedRental" : rental};
            $("#apartmentDetails").html(templatizer.selectedRental(view));  
        });
    },
    createRental: function(rental) {
        Rentals.toggleActive("newRental");
        $("#contentArea").html(templatizer.newRental());
    },
    validateData: function() {
        valid = true;
        if($("#location").val() === "") {
            valid = false;
        }
        else if($("#ownerPhone").val() === "") {
            valid = false;
        }
        return valid;
    },
    toggleActive: function(id) {
        $("li.active").removeClass("active");
        $("#" + id).addClass("active");
    },



};
