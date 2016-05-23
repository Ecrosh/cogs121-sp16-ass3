'use strict';

$(document).ready(function() {
	initializePage();
})
function initializePage() {
	$("#submitBtn").click(calc);
}

function calc(e){
	e.preventDefault();
	var x = document.getElementById("alcCalc");
	var name = x.elements[0].value;
	var gender = x.elements[1].value;
	var weight = x.elements[2].value;
	var hour = x.elements[3].value;
	var drinks = 0;
	var bap = 0;
	var difference = 0;
	var text = "";
	var i = 0;

	if (gender == "male"){
		if (weight == 100){
			drinks = 1;
			bap = .04;
			difference = .04;
		}
		if (weight == 120){
			drinks = 2;
			bap = .06;
			difference = .03;
		}
		if (weight == 140){
			drinks = 2;
			bap = .05;
			difference = .03;
		}
		if (weight == 160){
			drinks = 3;
			bap = .07;
			difference = .02;
		}
		if (weight == 180){
			drinks = 3;
			bap = .06;
			difference = .02;
		}
		if (weight == 200){
			drinks = 3;
			bap = .06;
			difference = .02;
		}
		if (weight == 220){
			drinks = 4;
			bap = .07;
			difference = .02;
		}
		if (weight == 240){
			drinks = 4;
			bap = .06;
			difference = .02;
		}
	}
	if (gender=="female"){
		if (weight == 90){
			drinks = 1;
			bap = .05;
			difference = .05;
		}
		if (weight == 100){
			drinks = 1;
			bap = .05;
			difference = .04;
		}
		if (weight == 120){
			drinks = 1;
			bap = .04;
			difference = .04;
		}
		if (weight == 140){
			drinks = 2;
			bap = .07;
			difference = .03;
		}
		if (weight == 160){
			drinks = 2;
			bap = .06;
			difference = .03;
		}
		if (weight == 180){
			drinks = 2;
			bap = .05;
			difference = .03;
		}
		if (weight == 200){
			drinks = 3;
			bap = .07;
			difference = .02;
		}
		if (weight == 220){
			drinks = 3;
			bap = .06;
			difference = .02;
		}
		if (weight == 240){
			drinks = 3;
			bap = .06;
			difference = .02;
		}
	}

	for ( i = 0; i <hour-1; i++){
		if  (bap + (difference-.015) < .07){
			bap = bap + (difference-.015);
			drinks ++;
		}

		else{
			bap  = bap - .015;
		}
	}
	
	text = name + ", <br>You can have "  + drinks + " drink";
	if (drinks > 1) text = text + "s";
	text = text + " in <br>" + hour + " hour";
	if (hour > 1) text = text + "s";
	document.getElementById("calc").innerHTML = text;
	//document.getElementById("test").innerHTML = "You weight " + weight + "<br> Your gender is " + gender;

}