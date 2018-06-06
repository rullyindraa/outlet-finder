$(document).ready(function(){
  $("#home").click(function (){
    $('html, body').animate({
      scrollTop: $(".home").offset().top
    }, 500);
  });
  $("#info").click(function (){
    $('html, body').animate({
      scrollTop: $(".info").offset().top
    }, 500);
  });
  $("#maps").click(function (){
    $('html, body').animate({
      scrollTop: $(".maps").offset().top
    }, 500);
  });
  $("#comment").click(function (){
    $('html, body').animate({
      scrollTop: $(".comment").offset().top
    }, 500);
  });
  $("#other").click(function (){
    $('html, body').animate({
      scrollTop: $(".other").offset().top
    }, 500);
  });
});