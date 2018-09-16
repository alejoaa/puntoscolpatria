require('dotenv').config()
var express = require('express'),
	path = require('path'),
	http = require('http');

var app = express();


app.set("view engine", "ejs");

// define paths to modules in node_modules
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// define views folder according to developing mode (developing or production)
if (process.env.DEV_ENV == "true") {
    app.set('views', path.join(__dirname, '/app/views'));
	app.use(express.static(__dirname + '/app/temp'));
	app.use(express.static(__dirname + '/app/assets'));
    console.log(__dirname + '/app/assets');
    console.log();
} else {
	app.set('views', path.join(__dirname, '/dist/views'));
	app.use(express.static(__dirname + "/dist/assets"));
}

// Routes
app.get('/', function(req, res) {
    res.redirect('/redeem');
});

app.get('/redeem', function(req, res) {
    res.render('redeem');
});

var port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});