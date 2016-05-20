(function($) {
  $("#toHome").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-home").offset().top
    }, 1200);
  });
  $("#toAbout").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: ($("#team-about").offset().top - 56)
    }, 1200);
  });         
  $("#toDanger").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: ($("#team-danger").offset().top - 56)
    }, 1200);
  });
  $("#toRisk").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: ($("#team-risk").offset().top - 56)
    }, 1200);
  });
  $("#toMod").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-mod").offset().top
    }, 1200);
  });



}($));


	 
(function($) {
  var navOffset = $("#nav-bar-pos").offset().top;

  $(window).scroll(function(){
    var scrollPos =  $(window).scrollTop();
    if((navOffset<=scrollPos)) {
      $("#nav-bar-pos").css("position" ,"fixed");
      $("#nav-bar-pos").css("top" ,"0");
      $("#nav-bar-pos").css("bottom", "auto");
    }
    else{
      $("#nav-bar-pos").css("position" ,"absolute");
      $("#nav-bar-pos").css("top" ,"auto");
      $("#nav-bar-pos ").css("bottom", "0");
    }
  });
}($));
