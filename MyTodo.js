(function() {

  //The heirarchy of the event binding functions is important, keep note of
  //their nesting.
  //Also css really hates numbers by themselves, so ensure they are appened
  //to some string.
  window.onload = function(e) {
    var i = 0; //Currently used to differentiate "add" button, will be replaced with
          // a label
    //move();

    $( ".addCategory" ).click(function(){

      console.log("Running");
      var panel = $('.todo');

      var div = $('<div class="category cat' + i + '"></div>');
      var table = $('<table></table>');
      var row = $('<tr></tr>');

      var title = $('<p class="title">Homework</p>');
      var prgBar = $('<div id="myProgress"><div id="myBar"></div></div>');
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

          }
        });

      });
      i += 1; //Increment the counter
    });



  };

  function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }

})();
