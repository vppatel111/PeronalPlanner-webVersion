(function() {

  window.onload = function(e) {

  //Build the day schedule
  for (var i = 0; i < 14; i++) {

    //Create and append the panel and the text for that panel
    var panel = $("<p class='goalList'></p>").text("Goal List");
    $("div.goalList").append(panel);

  }

};

})();
