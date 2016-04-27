$(function() {
  $("#toHome").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-home").offset().top
    }, 1300);
  });
  $("#toGraph").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-graph").offset().top
    }, 1300);
  });         
  $("#toAbout").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: ($("#team-about").offset().top - 53)
    }, 1300);
  });
});


	 
$(function() {
  var navOffset = $("#navBar").offset().top;
//  var leftVal = 0;



  $(window).scroll(function(){
  	var scrollPos =  $(window).scrollTop();

   // alert(scrollPos);
    // while scrolling down
    if((navOffset<=scrollPos)) {
      $("#navBar").css("position" ,"fixed");
  	  $("#navBar").css("top" ,"0");
      $("#navBar").css("bottom", "auto");
      //shift right
      //alert($(window).width());
//      if(leftVal != $(window).width()) {
//        $("#nav-clear").css("left", leftVal+=7);
//             leftVal+=2;

//        $("#nav-clear").css("width", leftVal);
      }
    }
    else{
      $("#navBar").css("position" ,"absolute");
  	  $("#navBar").css("top" ,"auto");
      $("#navBar").css("bottom", "0");
//    $("#nav-clear").css("width", leftVal);
    }
  });
});
