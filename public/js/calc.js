'use strict';

(function() {
	var calc = function(e) {
	
		e.preventDefault();
		
		var name = $("#name").val();
		var gender = $("#gender").val();
		var weight = $("#weight").val();
		var hour = $("#hour").val();
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
		$("#result").html(text);
		//$("#test").html("You weight " + weight + "<br> Your gender is " + gender);
	
	};
	$("#alcCalc").submit(calc);
})($);