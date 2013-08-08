(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// newRental.jade compiled template
exports.newRental = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="form-horizontal"><fieldset><div id="legend"><legend>New Rental</legend></div><div class="control-group"><label for="apartmentName" class="control-label">Apartment Name</label><div class="controls"><input id="apartmentName" type="text" name="apartmentName" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="ownerType" class="control-label">Owner/Broker</label><div class="controls"><input id="ownerType" type="text" name="ownerType" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="rent" class="control-label">Rent</label><div class="controls"><input id="rent" type="text" name="rent" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="ownerName" class="control-label">Owner Name</label><div class="controls"><input id="ownerName" type="text" name="ownerName" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="ownerPhone" class="control-label">Owner Phone</label><div class="controls"><input id="ownerPhone" type="text" name="ownerPhone" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="location" class="control-label">Location</label><div class="controls"><input id="location" type="text" name="location" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><label for="location" class="control-label">Ad Url</label><div class="controls"><input id="webPage" type="text" name="webPage" placeholder="" class="input-xlarge"/></div></div><div class="control-group"><div class="controls"><button id="create" class="btn btn-success">Submit</button></div></div></fieldset></div>');
    }
    return buf.join("");
};

// rentals.jade compiled template
exports.rentals = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="well span4"><table class="table"><thead><tr><th>Rentals</th><th style="width: 36px;"></th></tr></thead><tbody>');
        (function() {
            var $$obj = rentals;
            if ("number" == typeof $$obj.length) {
                for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var rental = $$obj[$index];
                    buf.push("<tr" + jade.attrs({
                        id: rental.Id
                    }, {
                        id: true
                    }) + ">");
                    var icon = "icon-remove";
                    if (rental.Visited) {
                        icon = "icon-ok";
                    }
                    icon = icon + " pull-right";
                    buf.push("<td>" + jade.escape(null == (jade.interp = rental.ApartmentName + " @ " + rental.Location) ? "" : jade.interp) + "<span" + jade.attrs({
                        "class": icon
                    }, {
                        "class": true
                    }) + "> </span></td></tr>");
                }
            } else {
                var $$l = 0;
                for (var $index in $$obj) {
                    $$l++;
                    if ($$obj.hasOwnProperty($index)) {
                        var rental = $$obj[$index];
                        buf.push("<tr" + jade.attrs({
                            id: rental.Id
                        }, {
                            id: true
                        }) + ">");
                        var icon = "icon-remove";
                        if (rental.Visited) {
                            icon = "icon-ok";
                        }
                        icon = icon + " pull-right";
                        buf.push("<td>" + jade.escape(null == (jade.interp = rental.ApartmentName + " @ " + rental.Location) ? "" : jade.interp) + "<span" + jade.attrs({
                            "class": icon
                        }, {
                            "class": true
                        }) + "> </span></td></tr>");
                    }
                }
            }
        }).call(this);
        buf.push('</tbody></table></div><div id="apartmentDetails"></div>');
    }
    return buf.join("");
};

// selectedRental.jade compiled template
exports.selectedRental = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="span6 form-horizontal">');
        if (selectedRental) {
            var icon = "icon-remove";
            if (selectedRental.visited) {
                icon = "icon-ok";
            }
            buf.push("<h3>" + jade.escape(null == (jade.interp = selectedRental.ApartmentName + " @ " + selectedRental.Location) ? "" : jade.interp) + "<span" + jade.attrs({
                "class": icon
            }, {
                "class": true
            }) + "></span></h3><ul><li>" + jade.escape(null == (jade.interp = selectedRental.OwnerOrDealer + " - " + selectedRental.OwnerName) ? "" : jade.interp) + "</li><li>" + jade.escape(null == (jade.interp = selectedRental.RentAmount) ? "" : jade.interp) + "</li><li>" + jade.escape(null == (jade.interp = selectedRental.OwnerPhone) ? "" : jade.interp) + "</li><li>" + jade.escape(null == (jade.interp = selectedRental.webpage) ? "" : jade.interp) + "</li></ul>");
            if (!selectedRental.visited) {
                buf.push("<div" + jade.attrs({
                    id: selectedRental.id
                }, {
                    id: true
                }) + '><button id="visited" class="btn btn-success">Mark as Visited</button></div>');
            }
        } else {
            buf.push("<h3>" + jade.escape(null == (jade.interp = "Please click on the rental to view the details here") ? "" : jade.interp) + "</h3>");
        }
        buf.push("</div>");
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();