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

    var query = 'SELECT x.gender, x.number_of_respondents FROM cogs121_16_raw.cdph_smoking_prevalence_in_adults_1984_2013 x WHERE year = 2003 ORDER BY x.number_of_respondents, x.gender DESC'
    //Lists all marijuana cases by ascending date
    var query2 = 'SELECT charge_description, community, activity_date FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%MARIJUANA%\' AND community != \'\' ORDER BY activity_date'
    //Lists all the communities and the number of marijuana cases associated with ea commuity
    var query3 = 'SELECT community, COUNT(charge_description) FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%MARIJUANA%\' AND community != \'\' GROUP BY community ORDER BY community'
    //Lists all the marijuana cases that occur in each zip code in San Diego
    var query4 = 'SELECT zip, COUNT(charge_description) FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%MARIJUANA%\' AND community = \'SAN DIEGO\' GROUP BY zip ORDER BY zip;'
    //Lists all the marijuana cases that occur in each zip code and ordered by each zip Code in San Diego
    var query5 = 'SELECT * FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%MARIJUANA%\' AND community = \'SAN DIEGO\' AND zip != \'\' ORDER BY zip'
    client.query(query2, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    //console.log(result.rows);
                    res.json(result.rows);
                  });
  });
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
