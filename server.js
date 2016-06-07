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
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }

    //Counts number of alcohol related crimes for each zipcode in San Diego
    var query = 'SELECT zip, COUNT(*) FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%ALC%\' AND ' + 
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

app.get('/duiData', function (req, res) {
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }
    //console.log("DUI query executing");
    //Counts number of DUI for each zipcode in San Diego
    var query1 ='SELECT zip, COUNT(*) as DUI FROM cogs121_16_raw.arjis_crimes WHERE charge_description LIKE \'%DUI%\' AND ' + 
                'community = \'SAN DIEGO\' AND zip != \'\' AND zip != \'92014\' AND zip != \'92046\' AND zip != \'92127\' AND ' +
                'zip != \'92128\' AND zip != \'92129\' AND zip != \'92182\' AND zip != \'92027\' AND zip != \'91942\' AND ' + 
                'zip != \'92071\' AND zip != \'92093\'  AND zip != \'92134\' AND zip != \'92136\' AND zip != \'92154\' AND zip != \'92161\'GROUP BY zip ORDER BY zip;'
    
    client.query(query1, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    res.json(result.rows);
                    client.end();
                    //console.log("DUI query closing");
                  });
  });
});

app.get('/genderData', function (req, res) {
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }
    //Total chronic alcohol disorder cases for each gender
    var query2 ='with y as( with x as (select g."Gender", replace(g."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No.", g."Year" ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_gender_2010_2012 g ' +
                'where g."Hospitalization No." != \'\') ' +
                'select x."Gender", x."Year", cast(x."Hospitalization No." as Integer) as gSum from x) ' +
                'select y."Gender", y."Year", sum(y.gSum) as genderSum from y group by y."Gender", y."Year" order by y."Gender", y."Year"';
    
    client.query(query2, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    var newJSON = JSON.stringify(result.rows);
                    var parse = JSON.parse(newJSON);
                    var year = ["2010", "2011", "2012"];

                    var genderJSON = [ { State: 'Female', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                       { State: 'Male', freq: {"2010": 0, "2011": 0, "2012": 0}} ]; 
                    
                    var g = 0;
                    for(var i = 0; i < 2; i++) {
                        var arr = genderJSON[i];
                        for (var j = 0; j < 3; j++, g++) {
                          arr.freq[year[j]] = parseInt(parse[g].gendersum);
                      }
                    }
                    res.json(genderJSON);
                    client.end();
                  });
  });
});

app.get('/raceData', function (req, res) {
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }
    //Total chronic alcohol disorder cases for each race
    var query3 ='with y as( with x as (select r."Race", replace(r."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No.", r."Year" ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_race_2010_2012 r ' +
                'where r."Hospitalization No." != \'\') ' +
                'select x."Race", x."Year", cast(x."Hospitalization No." as Integer) as rSum from x) ' +
                'select y."Race", y."Year", sum(y.rSum) as raceSum from y group by y."Race", y."Year" order by y."Race", y."Year"';
    
    client.query(query3, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    var newJSON = JSON.stringify(result.rows);
                    var parse = JSON.parse(newJSON);
                    var year = ["2010", "2011", "2012"];

                    var raceJSON = [ { State: 'API', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: 'Black', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: 'Hispanic', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: 'Other', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: 'White', freq: {"2010": 0, "2011": 0, "2012": 0}} ]; 
                    
                    var g = 0;
                    for(var i = 0; i < 5; i++) {
                        var arr = raceJSON[i];
                        for (var j = 0; j < 3; j++, g++) {
                          arr.freq[year[j]] = parseInt(parse[g].racesum);
                      }
                    }

                    res.json(raceJSON);
                    client.end();
                  });
  });
});

app.get('/ageData', function (req, res) {
  var conString= process.env.DATABASE_CONNECTION_URL;
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err){
      return console.error("could not connect to postgres", err);
    }
    //Total chronic alcohol disorder cases for each age range
    var query4 ='with y as( with x as (select a."Age", replace(a."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No.", a."Year" ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_age_2010_2012 a ' +
                'where a."Hospitalization No." != \'\' and a."Age" != \'0-14\') ' +
                'select x."Age", x."Year", cast(x."Hospitalization No." as Integer) as aSum from x) ' +
                'select y."Age", y."Year", sum(y.aSum) as ageSum from y group by y."Age", y."Year" order by y."Age", y."Year"';
    
    client.query(query4, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    var newJSON = JSON.stringify(result.rows);
                    var parse = JSON.parse(newJSON);
                    var year = ["2010", "2011", "2012"];

                    var ageJSON = [ { State: '15-24', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: '25-44', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: '45-64', freq: {"2010": 0, "2011": 0, "2012": 0}},
                                     { State: '65+', freq: {"2010": 0, "2011": 0, "2012": 0}} ]; 
                    
                    var g = 0;
                    for(var i = 0; i < 4; i++) {
                        var arr = ageJSON[i];
                        for (var j = 0; j < 3; j++, g++) {
                          arr.freq[year[j]] = parseInt(parse[g].agesum);
                      }
                    }

                    res.json(ageJSON);
                    client.end();
                  });
  });
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
