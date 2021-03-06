(function() {


  /* IDEA: (s) List
    - Reminders for events as they approach
    - Formatting on month calendar for small months
    - Highlighting of days that have tasks to do
  */
  window.onload = function(e) {

    // Uncomment to check local storage browser support
    // if (typeof(Storage) !== "undefined") {
    //   console.log("Works");
    // } else {
    //   console.log("Local storage not supported.");
    // }

    //Load in data from local storage.
    var plannerData = new PlannerData();
    var ai = new AI;

    //Only load when everything is done.
    var savedData = localStorage.getItem("dataJSON");
    var loadData = JSON.parse(savedData);

    //plannerData.month = savedData;
    //console.log("Heres the loaded data: ");
    //console.log(loadData);

    startTime();

    var now = new Date();
    var day = now.getDate();
    console.log(day + " " + now);

    // Display welcome message
    $( "#welcome" ).animate({opacity: '1'});

    // Disappear after 5 seconds.
    setInterval(function(){
      $( "#welcome" ).animate({opacity: '0'});
    }, 5000);

    //Build the day schedule
    for (var i = 1; i <= 24; i++) {
      var time = now.getHours();

      //Make current time box a different color
      if (i == time) {
        var dayElement = $("<button class='accordion current'></button>").text(getFormattedTime(i));
      } else {
        var dayElement = $("<button class='accordion'></button>").text(getFormattedTime(i));
      }

      //Create and append the panel and the text for that panel
      var panel = $("<div class='panel p" + i + "'></div>");
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
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November",
                      "December"];

    console.log(now.getMonth() + " " + now.getFullYear() + " " + firstDay);

    //Build and print the month title
    var title = $("<ul class='month'></ul>");
    var titleText = $("<li>" + monthNames[now.getMonth()] + "</li>")
    title.append(titleText);

    var calendar = $("#calendar")
    calendar.prepend(title);

    //Build and print the days
    var currentDay = 0; //Day counter
    for (var i = 1; i <= 42; i++) {

      if (i < firstDay) // Prints blank squares until it reaches the first day
      {
        var calendarDay = $("<li></li>").text("");
      }
      else if (i == day+firstDay-1) //Check if active day, in which case mark it.
      {
        currentDay += 1;
        var calendarDay = $("<li class='active " + currentDay + "'></li>").text("");
        calendarDay.append("<span class='active'>" + currentDay + "</span>");
      }
      else if (i >= days+firstDay) //If we already printed all the days put in more blank squares.
      {
        var calendarDay = $("<li></li>").text("");
      }
      else
      {
        currentDay += 1;
        var calendarDay = $("<li class='" + currentDay + "'></li>").text(currentDay);
      }


      $( ".days" ).append(calendarDay);
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

    //BUG: Button needs to move down as well.
    $( ".add" ).click(function(){

      var para = $("<textarea name='plans' rows='2'" +
                   "cols='30' class='scheduleText'></textarea>").text("hi");
      $(".p" + this.id).append(para)

      // Extend panel further to accomodate entry
      var panel = this.parentElement;
      panel.style.maxHeight = panel.scrollHeight + "px";

    });

    /* Settings button clicked */
    $( "#settings" ).click(function(){
      $( "#overlay" ).fadeIn(400);
      $( "#settingsContainer" ).fadeIn(400);
      plannerData.saveDayData(now.getMonth(), now.getDay());
    });

    $( "#overlay" ).click(function() {
      $( "#overlay" ).fadeOut(400);
      $( "#settingsContainer" ).fadeOut(400);
    });

    // //Scroll bar styling
    // $(document).ready(function () {
    //       if (!$.browser.webkit) {
    //         console.log("Not available");
    //           $('.container').jScrollPane();
    //       }
    //       console.log("Is available");
    //   });

    /* ------------------ Changing days -----------------------------------*/

    $( "ul.days li" ).click(function(){

      //Assign the one element the clicked property
      if (this.className) {

        //Clear ALL elements
        $( "ul.days > li" ).removeClass("click");

        //Now style the selected element
        this.classList.toggle("click");

        console.log("ID: ~" + this.classList[0]);
        plannerData.loadDayData(now.getMonth(), this.classList[0]);
      }

    });

    /* ------------------ Save data in localStorage--------------------------*/

    // var superArray = [][];
    // superArray[0][0] = "hi";
    // console.log(superArray[0][0]);

    //Fill up months array with the days of the month


    /* NOTE: Unfortunately it seems that we cannot conver stuff to JSON and
    expect to save object methods or types therefore we are going to instead
    just store the necessary information and load it up when needed. */

    console.log(plannerData);

    //Convert important data and save it in local storage
    var dataJSON = JSON.stringify(plannerData.month);

    // localStorage.Clear(); //Dump local storage
    localStorage.setItem("dataJSON", dataJSON);
    console.log(plannerData.month);


    ai.greet();

  }; //Heres where the onload function ends

  var AI = function() {

    //Initialize AI time.
    var now = new Date();
    AI.time = now.getHours();

    AI.wakeUpTime = 12;
    AI.sleepTime = 0;
    AI.asleep = this.updateStatus(now);

    //AI.prototype.greet
    //AI.prototype.weather
    //AI.prototype.speak = function () {

  };

  AI.prototype.updateStatus = function (now) {

    var time = now.getHours();
    if ( (time >= 0) && (time <= 12) ) {
      return true;
    } else {
      return false;
    }
  }

  AI.prototype.greet = function () {

    if (AI.asleep) {
        this.chat("...zzz...");
    } else {
      var time = (new Date()).getHours();

      var morning = 12;
      var afternoon = 18;
      var evening = 24;

      //Set welcome text
      if (time < morning)
      {
        this.chat("Good morning.");
      }
      else if (time < afternoon)
      {
        this.chat("Good afternoon!");
        this.chat("How are you doing?");
      }
      else if (time < evening)
      {
        this.chat("Good evening.");
      }
    }

  };

  //Build and display a message
  AI.prototype.chat = function(message) {

    var msgContainer = $('<li class="msgContainer"></li>');
    var msg = $('<div class="msg"></div>');
    var msgText = $('<div class="text"><p>' + message + '</p></div>');
    var chat = $("#chat");

    msg.append(msgText);
    msgContainer.append(msg);
    chat.append(msgContainer);

    $( ".msgContainer" ).animate({opacity: '1',
                                  width: '100%'}, "slow");

  };

  var PlannerData = function(month) {

    //Use cookie to check for first time array creation.

    //Create a 3D array for an entire year if one does not already exist.
    var month = new Array(12);
    for (i = 0; i < 12; i++) {

      month[i] = new Array(31);
      for (j = 0; j < 31; j++) {

        month[i][j] = new Array(24);
        for (k = 0; k < 24; k++) {
          month[i][j][k] = "D";
        }
      }
    }

    this.month = month; //month = [month][day][hour][data]

  };

  // IDEA: Switch to a dynamic tree structure later when storage gets massive
  // for easy storage and sorting.
  PlannerData.prototype.saveDayData = function(month, day) {
    console.log("Month " + this.month);
    this.month[month][day] = this.getDayData();
  };

  //Fills up and returns an array with data from current day
  PlannerData.prototype.getDayData = function() {

    var hours = new Array(24);
    for (i = 0; i < 23; i++) {

      //Create array of entries for each hour.
      var hourData = new Array();
      var enteredText = $( "div.p" + (i + 1)).children("textarea");
      for(j = 0; j < enteredText.length; j++) {
        hourData.push($(enteredText[j]).val());
      }

      hours[i] = hourData;

    }

    console.log(hours);
    return hours;
  };

  PlannerData.prototype.loadDayData = function(month, day) {

    //Append on new data
    //console.log(" THE TEST " + month + " " + day);
    var data = this.month[month][day];

    if (typeof data == 'undefined') { // Do nothing if data is present
      console.log("Nothing loaded");
    } else { // Otherwise load and append

      for (i = 0; i < 23; i++) {

        var hourData = data[i];
        var timeslot = $( "div.p" + (i + 1));

        //Clear the existing children first
        timeslot.find("textarea").remove();

        //Load in the data for that column
        for (j = 0; j < hourData.length; j++) {
          var plan = $("<textarea name='plans' rows='2' cols='30'" +
                       " class='scheduleText'></textarea>").text(hourData[j]);
          timeslot.prepend(plan);
        }
      }

      console.log("Loading Successful" + month + " " + day);

    }

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

  //Takes a 24 hour time and returns a formatted time.
  function getFormattedTime(i) {

    // Simply returns i:00 if 24 hour time
    if (false) {
      return i + ":00";
    } else {

      //Otherwise format the time
      if (i < 12) {
        return i +":00 AM";
      } else if (i == 12) {
        return "12:00 PM";
      } else if (i == 24) {
        return "12:00 AM";
      } else {
        return (i - 12) + ":00 PM";
      }

    }
  }

})();
