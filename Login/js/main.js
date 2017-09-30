$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$("#loginbutton").click(function(){
  var usn = document.getElementById("loginusername").value;
  var pw = document.getElementById("loginpassword").value;
  var location = "../html/index.html?usn=" + usn + "?hash=" + pw.hashCode();
  window.location.href = location;
});

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
