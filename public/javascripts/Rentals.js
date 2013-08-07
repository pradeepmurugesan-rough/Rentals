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
                $("li.active").removeClass("active");
                $(event.target).parent().addClass("active");
                Rentals.createRental();
            } 
            else if($(event.target).parent().is("#rentals")) {
                $("li.active").removeClass("active");
                $(event.target).parent().addClass("active");
                Rentals.getRentals();
            }
        });
        $("#contentArea").click(function(event){ 
            if($(event.target).is("#create")){
                Rentals.postRental();
            }
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
        $.getJSON("/rentals", function(data){
            var view = {"rentals": data};
            $("#contentArea").html(ich.rentals(view));
        });
    },
    getRental: function(id) {
        
    },
    createRental: function(rental) {
        $("#contentArea").html(ich.newRental());
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



};
