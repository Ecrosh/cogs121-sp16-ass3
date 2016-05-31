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
    var query1 ='with y as( with x as (select g."Gender", replace(g."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No." ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_gender_2010_2012 g ' +
                'where g."Year" = 2012 and g."Hospitalization No." != '') ' +
                'select x."Gender", cast(x."Hospitalization No." as Integer) as gSum from x) ' +
                'select y."Gender", sum(y.gSum) as genderSum from y group by y."Gender" order by y."Gender"';
    
    client.query(query1, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    res.json(result.rows);
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
    var query1 ='with y as( with x as (select r."Race", replace(r."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No." ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_race_2010_2012 r ' +
                'where r."Year" = 2012 and r."Hospitalization No." != '') ' +
                'select x."Race", cast(x."Hospitalization No." as Integer) as rSum from x) ' +
                'select y."Race", sum(y.rSum) as raceSum from y group by y."Race" order by y."Race"';
    
    client.query(query1, function(err, result){
                    if(err){
                      return console.error('error running query',err);
                    }
                    res.json(result.rows);
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
    var query1 ='with y as( with x as (select a."Age", replace(a."Hospitalization No.", \'<5\', \'4\') as "Hospitalization No." ' +
                'from cogs121_16_raw.hhsa_chronic_alcohol_related_disorder_by_age_2010_2012 a ' +
                'where a."Year" = 2012 and a."Hospitalization No." != '') ' +
                'select x."Age", cast(x."Hospitalization No." as Integer) as aSum from x) ' +
                'select y."Age", sum(y.aSum) as ageSum from y group by y."Age" order by y."Age"';
    
    client.query(query1, function(err, result){
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
