
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , rentals = require('./routes/rentals')
  , http = require('http')
  , path = require('path')
  , templatizer = require('templatizer');

var app = express();

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
var jadeClientTemplatesDir = __dirname + "/views/clientTemplates" ;
var jsTemplateDir = __dirname + "/public/javascripts/template";
templatizer(jadeClientTemplatesDir, jsTemplateDir + '/template.js');
//console.log(jadeClientTemplatesDir + "=== " + jsTemplateDir);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/rentals', rentals.list);
app.get('/rentals/:id', rentals.findById);
app.post('/new', rentals.addRental);
app.get('/visited/:id', rentals.markVisited);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
