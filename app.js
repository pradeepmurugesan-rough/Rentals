
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , rentals = require('./routes/rentals')
  , http = require('http')
  , path = require('path')
  , templatizer = require('templatizer')
  , mysql =  require('mysql');


var app = express();
var devDb = {
    host:'localhost',
    port: '3306',
    user: 'rentalUser',
    password:'rentalUser',
    database: 'Rentals'
};
var prodDb = {
    host:'localhost',
    port: '10000',
    user: 'uJUDtGchPR36n',
    password: 'pWSrnJZTzDXUH',
    database: 'd9776c92981d14fdeaa7e62f927b207'
};

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('db', devDb);
var jadeClientTemplatesDir = __dirname + "/views/clientTemplates" ;
var jsTemplateDir = __dirname + "/public/javascripts/template";
templatizer(jadeClientTemplatesDir, jsTemplateDir + '/template.js');
//console.log(jadeClientTemplatesDir + "=== " + jsTemplateDir);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
if ('production' == app.get('env')) {
  app.set('db', prodDb);
}
var config = app.get('db');
var db = mysql.createConnection( config );
//console.log(db);
express.request.db = express.response.db = db;
app.get('/', routes.index);
app.get('/rentals', rentals.list);
app.get('/rentals/:id', rentals.findById);
app.post('/new', rentals.addRental);
app.get('/visited/:id', rentals.markVisited);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
