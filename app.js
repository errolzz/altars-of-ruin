
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/site', routes.site);

// start the server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
