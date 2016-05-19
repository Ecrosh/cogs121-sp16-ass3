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
}($));
