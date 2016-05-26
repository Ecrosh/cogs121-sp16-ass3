//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var pg = require('pg');
var app = express();

//client id and client secret here, taken from .env (which you need to create)
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

//Configures the Template engine
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/delphidata', function (req, res) {
  // TODO
  // Connect to the DELPHI Database and return the proper information
  // that will be displayed on the D3 visualization
  // Table: Smoking Prevalance in Adults
  // Task: In the year 2003, retrieve the total number of respondents
  // for each gender. 
  // Display that data using D3 with gender on the x-axis and 
  // total respondents on the y-axis.
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }

    //Counts number of alcohol related crimes for each zipcode in San Diego
    var query = 'SELECT zip, COUNT(*) FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%ALCOHOL%\' AND ' + 
                'community = \'SAN DIEGO\' AND zip != \'\' AND zip != \'92014\' AND zip != \'92046\' AND zip != \'92127\' AND ' +
                'zip != \'92128\' AND zip != \'92129\' AND zip != \'92182\' AND zip != \'92027\' AND zip != \'91942\' AND ' + 
                'zip != \'92071\' AND zip != \'92093\'  AND zip != \'92134\' AND zip != \'92136\' AND zip != \'92154\' AND zip != \'92161\'GROUP BY zip ORDER BY zip;'
    
    client.query(query, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    res.json(result.rows);
                    client.end();
                  });
  });
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
