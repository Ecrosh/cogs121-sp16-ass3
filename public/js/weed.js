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
