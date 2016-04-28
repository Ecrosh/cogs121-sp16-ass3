$(function() {
  $("#toHome").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-home").offset().top
    }, 1200);
  });
  $("#toGraph").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-graph").offset().top
    }, 1200);
  });         
  $("#toAbout").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: ($("#team-about").offset().top - 53)
    }, 1200);
  });
});


	 
$(function() {
  var navOffset = $("#navBar").offset().top;

  $(window).scroll(function(){
    var scrollPos =  $(window).scrollTop();
    if((navOffset<=scrollPos)) {
      $("#navBar").css("position" ,"fixed");
  	  $("#navBar").css("top" ,"0");
      $("#navBar").css("bottom", "auto");
    }
    else{
      $("#navBar").css("position" ,"absolute");
  	  $("#navBar").css("top" ,"auto");
      $("#navBar").css("bottom", "0");
    }
  });
});

function siren() {
  var audio = new Audio('/audio/police1.wav');
  audio.play();
}
