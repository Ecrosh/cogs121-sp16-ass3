(function(d3) {
  "use strict";

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

function drugChart(data){

  var zipCode = data.map(function (d){ return d.zip; });
  var count = data.map(function (d){ return d.count; })

  var colour = d3.scale.linear()
                .domain([1, 50])
                .range(["#E8F0E8", "green"]);

  var i = 0;
  data.forEach(function(d){ //d is of form [id,value]
    d3.select("g#x_"+zipCode[i]) //select the group matching the id
      .datum(d) //attach this data for future reference
      .classed("region", true)
      .selectAll("path, polygon")
      .datum(d) //attach the data directly to *each* shape
      .attr("fill", count[i]>0?colour(count[i]):"lightgray");
    i++;
  });
  

  var infoBox = d3.select("div#info");
  d3.selectAll("g.region")
  .on("mouseover", function(d,i) {
		var location = "temp";
		if (zipCode[i] == 92037) location = "La Jolla";
		else if(zipCode[i] == 92101) location = "Downtown";
		else if(zipCode[i] == 92102) location = "South Park";
		else if(zipCode[i] == 92103) location = "Hillcrest";
		else if(zipCode[i] == 92104) location = "North Park";
		else if(zipCode[i] == 92105) location = "City Heights";
		else if(zipCode[i] == 92106) location = "Point Loma";
		else if(zipCode[i] == 92107) location = "Ocean Beach";
		else if(zipCode[i] == 92108) location = "Mission Valley";
		else if(zipCode[i] == 92109) location = "Pacific Beach";
		else if(zipCode[i] == 92110) location = "Old Town";
		else if(zipCode[i] == 92111) location = "Kearny Mesa";
		else if(zipCode[i] == 92113) location = "Logan Heights";
		else if(zipCode[i] == 92114) location = "Encanto";
		else if(zipCode[i] == 92115) location = "San Diego State";
		else if(zipCode[i] == 92116) location = "University Heights";
		else if(zipCode[i] == 92117) location = "North Clairemont";
		else if(zipCode[i] == 92119) location = "Mission Trails";
		else if(zipCode[i] == 92120) location = "Allied Gardens";
		else if(zipCode[i] == 92121) location = "Sorrento Valley";
		else if(zipCode[i] == 92122) location = "University City";
		else if(zipCode[i] == 92123) location = "Serra Mesa";
		else if(zipCode[i] == 92124) location = "Tierra Santa";
		else if(zipCode[i] == 92126) location = "Mira Mesa";
		else if(zipCode[i] == 92130) location = "Carmel Valley";
		else if(zipCode[i] == 92131) location = "Scripps Ranch";
		else if(zipCode[i] == 92139) location = "Paradise Hills";
		else if(zipCode[i] == 92140) location = "Marine Corps";
		else{
			location = "Not Available";
			}
         infoBox.html("Location <span style=\"font-size: 50px\"> <br>"+ location+
		 "</span> <br><br><br>Number of Weed Arrests<br><br><br><span style=\"font-size: 50px\">" + count[i] +
		 "</span><br><br><br>ZipCode<br><br><span style=\"font-size: 50px\">" +zipCode[i] + "</span>"); //print the associated data
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