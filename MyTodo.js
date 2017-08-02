(function() {

  //The heirarchy of the event binding functions is important, keep note of
  //their nesting.
  //Also css really hates numbers by themselves, so ensure they are appened
  //to some string.
  window.onload = function(e) {
    var i = 0; //Currently used to differentiate "add" button, will be replaced with
          // a label
    //move();

    var todoData = new TodoData();

    $( ".addCategory" ).click(function(){

      console.log("Running");
      var panel = $('.todo');

      var div = $('<div class="category cat' + i + '"></div>');
      var table = $('<table></table>');
      var row = $('<tr></tr>');

      var title = $('<p class="title">Homework</p>');
      var prgBar = $('<div id="myProgress"><div class="myBar" id="myBar' + i + '"></div></div>');
      var form = $('<form id="chkList"></form>');

      //Note: The text is wrapped in paragraph elements for easy styling.
      var chkBox = $('<td><input type="checkbox" name="homwork" value="Math"></td>');
      var chkText = $('<td><p class="chkText">Example</p></td>')

      var button = $('<button class="add button' + i + '" + id="' + i + '">Add</button>');


      row.append(chkBox);
      row.append(chkText);
      table.append(row);
      form.append(table);

      div.append(title);
      div.append(prgBar);
      div.append(form);
      div.append(button);

      panel.prepend(div);

      todoData.add();

      $( ":checkbox" ).unbind().click(function() {
        if (this.checked) {

          //Replace 0 with ID
          todoData.todoList[0].completedTasks += 1;
          console.log("Riding cowboy " + todoData.todoList[0].completedTasks);
          move(1, todoData.todoList[0].completedTasks);

          $(this).attr("disabled", true);
        }
      });

      //Bind add button functionality
      $( ".add.button" + i ).click(function(){

        //Create and append a text area
        var input = $("<textarea name='plans' rows='2'" +
                     "cols='30' class='scheduleText'></textarea><br>").text("Press enter when done.");

        //Note: We cannot use numbers as an ID.
        var btn = $(".button" + this.id);

        //console.log(this.id);
        input.insertBefore(btn);

        //Convert to a checkbox when the user presses enter.
        $( ".scheduleText" ).bind("keypress", function(e) {

          //console.log("Key press: " + e.keyCode);
          // If enter key was pressed turn the input into a checkbox.
          if (e.keyCode == 13) {
            var row = $('<tr></tr>');
            var chkBox = $('<td><input type="checkbox" ' +
                           'name="homwork" ' +
                           'value="Math"></td>');
            var chkText = $('<td><p class="chkText">' + 'example' + '</p></td>');

            //Painstakingly finds the table
            var table = $(this).siblings().filter("#chkList").find("table");

            row.append(chkBox);
            row.append(chkText);
            row.appendTo(table);

            //NOTE: AppendTo inserts html element, Append simply inserts content.
            //chkBox.appendTo(form);

            //Remove text area element
            var br = this.nextElementSibling;
            //var br = para.nextElementSibling;
            this.remove();
            br.remove();
            //para.remove();

            $( ":checkbox" ).unbind().click(function() {
              if (this.checked) {

                //Replace 0 with ID
                todoData.todoList[0].completedTasks += 1;

                var progID = $(this).parents("#chkList").siblings("#myProgress").children().attr("id");
                console.log(progID);
                move(1, todoData.todoList[progID.slice(-1)].completedTasks, progID);

                $(this).attr("disabled", true);
              }
            });

          }
        });

      });
      i += 1; //Increment the counter
    });

  }; //End of onload()

  var TodoData = function() {
    var todoList = new Array();
    this.todoList = todoList;
  };

  TodoData.prototype.add = function () {
    this.todoList.push(new TodoCategory("Homework", 3));
  };

  var TodoCategory = function(name, numTasks) {
    this.name = name;
    this.numTasks = numTasks;
    this.completedTasks = 0;
  };

  function move(width, value, progID) {
    var elem = document.getElementById(progID);
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= value) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }

})();
