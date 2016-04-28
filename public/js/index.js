(function(d3) {
  "use strict";

  var data = [
    { name: "Lolita's", rating: 7.5 },
    { name: "Lucha Libre", rating: 8 },
    { name: "Puesto", rating: 9.5 },
    { name: "Rubio's", rating: 4 },
    { name: "Taco Bell", rating: 3 },
    { name: "Taco Stand", rating: 8.5 },
    { name: "Taco's, El Gordo", rating: 9 },
    { name: "Oscar's", rating: 9 },
    { name: "Rigoberto's", rating: 6 },
    { name: "Galaxy Taco", rating: 6.5 },
  ];

  // Defining the margins and chart size
  // See margin conventions for more information
  var margin = {top: 20, right: 10, bottom: 100, left: 40},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var innerWidth  = width  - margin.left - margin.right;
  var innerHeight = height - margin.top  - margin.bottom;

  // TODO: Input the proper values for the scales
  var xScale = d3.scale.ordinal().rangeRoundBands([0, innerWidth], 0.5);
  var yScale = d3.scale.linear().range([innerHeight, 0]);

  // Define the chart
  var chart = d3
                .select(".chart")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");

//var rotateTranslate = d3.svg.transform().rotate(-45).translate(5,0);

  // Render the chart
  xScale.domain(data.map(function (d){ return d.name; }));

  // TODO: Fix the yScale domain to scale with any ratings range
  yScale.domain([0, 10]);

  // Note all these values are hard coded numbers
  // TODO:
  // 1. Consume the taco data
  // 2. Update the x, y, width, and height attributes to appropriate reflect this
  chart
    .selectAll(".bar")
    .data(data.map(function (d){ return d.rating; }))
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return i*(innerWidth/Object.keys(data).length); })
    .attr("width", 75)
    .attr("y", function(d) { return innerHeight-(d*(innerHeight/Object.keys(data).length)); })
    .attr("height", function(d) { return d*(innerHeight/Object.keys(data).length); });

  // Orient the x and y axis
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  // TODO: Append X axis
  chart
    .append("g")
    .call(xAxis)
    .attr("transform", "translate( 0," + innerHeight + ")")
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.9em")
      .attr("dy", ".5em")
      .attr("transform", "rotate(-45)" );;


  // TODO: Append Y axis
  chart
    .append("g")
    .call(yAxis);

  // ASSIGNMENT PART 1B
  // Grab the delphi data from the server
  d3.json("/delphidata", function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Data", data);
    drugChart(data);
});

})(d3);
/*
function delphiChart(data){
  var margin = {top: 20, right: 10, bottom: 100, left: 50},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var innerWidth  = width  - margin.left - margin.right;
  var innerHeight = height - margin.top  - margin.bottom;

  // TODO: Input the proper values for the scales
  var xScale = d3.scale.ordinal().rangeRoundBands([0, innerWidth], 0.1);
  var yScale = d3.scale.linear().range([0, innerHeight]);

  var graph = d3
                .select(".graph")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");

    xScale.domain(data.map(function (d){ return d.gender; }));
    yScale.domain([9000, 0]);

    var range = d3.max( data.map(function(d){ return d.number_of_respondents; }) );

    graph
    .selectAll(".bar")
    .data(data.map(function (d){ return d.number_of_respondents; }))
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return i*(innerWidth/Object.keys(data).length); })
    .attr("width", 250)
    .attr("y", function(d) { return innerHeight-(innerHeight*(d/range)); })
    .attr("height", function(d) { return innerHeight*(d/range); });

    // Orient the x and y axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    graph
    .append("g")
    .call(xAxis)
    .attr("transform", "translate( 0," + innerHeight + ")")
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.9em")
      .attr("dy", ".5em")
      .attr("transform", "rotate(-45)" );;

    graph
    .append("g")
    .call(yAxis);
}
*/
function drugChart(data){

  var zipCode = data.map(function (d){ return d.zip; });
  var count = data.map(function (d){ return d.count; })

  var colour = d3.scale.linear()
                .domain([1, 50])
                .range(["#E8F0E8", "green"]);

  var i = 0;
  data.forEach(function(d){ //d is of form [id,value]
    d3.select("g#x_"+zipCode[i]) //select the group matching the id
      //.datum(d) //attach this data for future reference
      .selectAll("path, polygon")
      //.datum(d) //attach the data directly to *each* shape
      .attr("fill", count[i]>0?colour(count[i]):"lightgray");
    i++;
  });
  
$('.precinct').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Hi there!';
    }
});

  var infoBox = d3.select("div#info");
  d3.selectAll("g.region")
  .on("click", function(d,i) {
         infoBox.html("<strong>" + d[0] + ": </strong>" + d[1] ); //print the associated data
  });

  
$('#laJolla').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'La Jolla';
    }
});
 
$('#downTown').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Downtown';
    }
});
 
$('#southPark').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'South Park';
    }
});
 
$('#hillCrest').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Hillcrest';
    }
});
 
$('#northPark').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'North Park';
    }
});
 
$('#cityHeights').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'City Heights';
    }
});
 
$('#pointLoma').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Point Loma';
    }
});
 
$('#oceanBeach').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Ocean Beach';
    }
});
 
$('#missionValley').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Mission Valley';
    }
});
 
$('#pacificBeach').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Pacific Beach';
    }
});
 
$('#oldTown').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Old Town';
    }
});
 
$('#kearnyMesa').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Kearny Mesa';
    }
});
 
$('#loganHeights').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Logan Heights';
    }
});
 
$('#encanto').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Encanto';
    }
});
 
$('#sanDiegoState').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'San Diego State';
    }
});
 
$('#universityHeights').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'University Heights';
    }
});
 
$('#northClairemont').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'North Clairemont';
    }
});
 
$('#missionTrails').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Mission Trails';
    }
});
 
$('#alliedGardens').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Allied Gardens';
    }
});
 
$('#sorrentoValley').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Sorrento Valley';
    }
});
 
$('#universityCity').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'University City';
    }
});
 
$('#serraMesa').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Serra Mesa';
    }
});
 
$('#tierraSanta').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Tierra Santa';
    }
});
 
$('#miraMesa').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Mira Mesa';
    }
});
 
$('#carmelValley').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Carmel Valley';
    }
});
 
$('#scrippsRanch').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Scripps Ranch';
    }
});
 
$('#paradiseHills').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Paradise Hills';
    }
});

$('#marineCorps').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Marine Corps';
    }
});
$('.other').tipsy({
    gravity: $.fn.tipsy.autoNS,
    title: function() {
        //alert("here");
        return 'Data Not Available';
    }
});  
  

}