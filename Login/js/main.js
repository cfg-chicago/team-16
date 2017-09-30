$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$("#loginbutton").click(function(){
  var location = "../html/index.html?usn=" + $("#loginbutton").val;
  window.location.href = location;
});
