(function() {

  window.onload = function(e) {
    var i;

    startTime();
    console.log("load");

    var now = new Date();
    var day = now.getDate();
    console.log(day + " " + now);

    var morning = 12;
    var afternoon = 18;
    var evening = 24;

    //Set welcome text
    if (now.getHours() < morning)
    {
      $( "#welcome" ).text("Good morning.");
    }
    else if (now.getHours() < afternoon)
    {
      $( "#welcome" ).text("Good afternoon!");
    }
    else if (now.getHours() < evening)
    {
      $( "#welcome" ).text("Good evening.");
    }

    // Display welcome message
    $( "#welcome" ).animate({opacity: '1'});

    // Disappear after 5 seconds.
    setInterval(function(){
      $( "#welcome" ).animate({opacity: '0'});
    }, 5000);

    //Build the day schedule
    for (var i = -3; i < 11; i++) {
      var time = now.getHours() + i;

      //Make current time box a different color
      if (i) {
        var dayElement = $("<button class='accordion'></button>").text(time + ":00");
      } else {
        var dayElement = $("<button class='accordion current'></button>").text(time + ":00");
      }

      //Create and append the panel and the text for that panel
      var panel = $("<div class='panel " + i + "'></div>");
      var para = $("<textarea name='plans' rows='2'" +
                   "cols='30' class='scheduleText'></textarea>").text(i);
      var add = $("<button class='add' id=" + i + "></button>").text("");
      var icon = $('<i class="fa fa-plus" aria-hidden="true"></i>')

      panel.append(para);
      add.append(icon);
      panel.append(add);

      $("#accordion").append(dayElement);
      $("#accordion").append(panel);

    }

    /* ------------------Build the calendar -------------------------------*/

    var days = daysInMonth(now.getMonth(), now.getFullYear());
    var firstDay = new Date(now.getFullYear(), now.getMonth()).getDay();
    console.log(now.getMonth() + " " + now.getFullYear() + " " + firstDay);


    //Print the calendar
    var currentDay = 0; //Day counter
    for (var i = 1; i <= 35; i++) {

      if (i < firstDay) // Prints blank squares until it reaches the first day
      {
        var calendarDay = $("<li></li>").text("");
      }
      else if (i == day+firstDay-1) //Check if active day, in which case mark it.
      {
        currentDay += 1;
        var calendarDay = $("<li class='active'></li>").text("");
        calendarDay.append("<span class='active'>" + currentDay + "</span>");
      }
      else if (i >= days+firstDay) //If we already printed all the days put in more blank squares.
      {
        var calendarDay = $("<li></li>").text("");
      }
      else
      {
        currentDay += 1;
        var calendarDay = $("<li></li>").text(currentDay);
      }


      $(".days").append(calendarDay);
    }

    //Methods to handle callback should be declared after the element is
    //created.
    $( ".accordion" ).click(function(){

      //console.log("click");
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

    });

    $( ".add" ).click(function(){

      var para = $("<textarea name='plans' rows='2'" +
                   "cols='30' class='scheduleText'></textarea>").text("hi");
      $("." + this.id).append(para)

      // Extend panel further to accomodate entry
      var panel = this.parentElement;
      panel.style.maxHeight = panel.scrollHeight + "px";

    });

    // var AI = function() {};
    // AI.prototype.greet
    // AI.prototype.weather
    // AI.prototype.speak = function () {
    //
    // };

  };

  //Begins clock
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    $("#time").text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);

  }

  //Returns number of days in a month
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  //Ensures time format stays uniform
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

})();
