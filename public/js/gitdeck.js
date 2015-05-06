$('#submit-gen').click(function() {
  // we check server-side too :) sneaky hobbitses
  var url = $('#repo-url').val();
  if (!url.match(/http(s)?:\/\/(www\.)?github\.com\/[a-zA-Z0-9\-_\.]+\/[a-zA-Z0-9\-_\.]+/)) {
    $("#repo-input").addClass("has-error");
    return;
  } else {
    url = url.split("/");
    var repo = url[url.length - 1];
    var user = url[url.length - 2];
    gen.repo = repo;
    gen.user = user;
  }

  // make the API call to github to check if there are .gitdeck files in the repo
  $.ajax({
    type: "GET",
    url: "https://api.github.com/search/code?q=user:"+user+"+repo:"+repo+"+extension:gitdeck",
    dataType: "json",
    success: function(data) {

      // make sure the API call returns more than 0 responses
      if (data["total_count"] < 1) {
        $("#repo-input").addClass("has-error");
        return;
      } else {
        var files = [];

        // extract the paths of each matching file
        for (var i = 0; i < data["items"].length; i++) {
          files.push(data["items"][i]["path"]);
        }

        // for each candidate file, add a link for the user to choose
        for (var i = 0; i < files.length; i++) {
          var tmp = "<span class='thumbnail'>"+files[i]+"</span>";
          $("#candidates").append(tmp);
        }

        // switch to the next banner
        $("#main-banner").fadeToggle(function() {
          $("#sec-banner").fadeToggle();
        })

      }
    },
    error: function(data) {
      $("#repo-input").addClass("has-error");
    }
  });
});

$("#candidates").on("click", ".thumbnail", function() {
  $("#sec-banner").fadeToggle(function() {
    $("#third-banner").fadeToggle();
  })
  gen.path = $(this).text();
  gen.request();
});
