var Gen = function() {
  var user = "";
  var repo = "";
  var path = "";
  this.request = function() {
    $.ajax({
      type: "POST",
      url: "",
      dataType: "",
      success: function(data) {

      },
      error: function(data) {

      }
    });
  }
}

var gen = new Gen();
