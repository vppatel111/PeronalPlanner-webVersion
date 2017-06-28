(function() {

  window.onload = function(e) {
    move();

    $( ".addCategory" ).click(function(){

      console.log("Running");
      var panel = $('.category');

      var table = $('<table></table>');
      var row = $('<tr></tr>');

      var title = $('<p class="title">Homework</p>');
      var prgBar = $('<div id="myProgress"><div id="myBar"></div></div>');
      var form = $('<form></form>');

      //Note: The text is wrapped in paragraph elements for easy styling.
      var chkBox = $('<td><input type="checkbox" name="homwork" value="Math"></td>');
      var chkText = $('<td><p class="chkText">Example</p></td>')

      var button = $('<button class="add">Add</button>');

      row.append(chkBox);
      row.append(chkText);
      table.append(row);
      form.append(table);

      panel.append(title);
      panel.append(prgBar);
      panel.append(form);
      panel.append(button);

      //Bind add button functionality
      $( ".add" ).click(function(){

        //var chkBox = $('<input type="checkbox" name="homwork" value="Math">');
        var input = $("<textarea name='plans' rows='1'" +
                     "cols='30' id='pls' class='scheduleText'></textarea><br>").text("Example");

        var endOfList = this.parentElement.lastElementChild;
        //endOfList.after(chkBox);
        input.insertBefore(endOfList);

        //Convert to a checkbox when the user presses enter.
        $( ".scheduleText" ).bind("keypress", function(e) {

          //console.log("Key press: " + e.keyCode);
          // If enter key was pressed turn the input into a checkbox.
          if (e.keyCode == 13) {
            var row = $('<tr></tr>');
            var chkBox = $('<td><input type="checkbox" ' +
                           'name="homwork" ' +
                           'value="Math"></td>');
            var chkText = $('<td><p class="chkText">' + 'example' + '</p></td>')
            var form = this.previousElementSibling;
            var table = form.firstElementChild;

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
