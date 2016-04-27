$(function() {
  $("#toHome").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-home").offset().top
    }, 1000);
  });
  $("#toGraph").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-graph").offset().top
    }, 1000);
  });         
  $("#toAbout").on("click", function(event) {
    event.preventDefault();
    var href = this.href;
    $('html, body').animate({
      scrollTop: $("#team-about").offset().top
    }, 1000);
  });
});

window.onscroll = function (e) {
/*  if(window.pageYOffset<50){//alert('stop') 
    document.getElementById("navBar").style.position = "fixed";
document.getElementById("navBar").style.bottom = "0"}
 */// if(window.pageYOffset>410)
 // 	    document.getElementById("navBar").style.position = "absolute";

}