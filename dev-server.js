var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

var reloadPort = process.argv[2] || 35729;

app.set('port', process.env.PORT || 9001);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(require('connect-livereload')({
  port: reloadPort
}));

app.use(express.logger('dev'));
app.use(express.errorHandler());

app.use(app.router);

app.use(require('less-middleware')({
  src: __dirname + '/app'
}));
app.use('/styles', express.static(path.join(__dirname, 'app/styles')));

app.get('/', function(req, res){
  res.render('page1', { title: 'Home' });
});
app.get('/1', function(req, res){
  res.render('page1', { title: 'Page 1' });
});
app.get('/2', function(req, res){
  res.render('page2', { title: 'Page 2' });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server started http://localhost:' + app.get('port'));
  console.log('Livereload on port: ',reloadPort);
});
