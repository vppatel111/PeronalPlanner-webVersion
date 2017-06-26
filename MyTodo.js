(function() {

  window.onload = function(e) {
    move();

    $( ".addCategory" ).click(function(){

      console.log("Running");
      var panel = $('.category');

      var title = $('<p class="title">Homework</p>');
      var prgBar = $('<div id="myProgress"><div id="myBar"></div></div>');
      var form = $('<form></form>');
      var chkBox = $('<input type="checkbox" name="homwork" value="Math">');
      var button = $('<button class="add">Add</button>');

      form.append(chkBox);
      panel.append(title);
      panel.append(prgBar);
      panel.append(form);
      panel.append(button);

    });

    $( ".add" ).click(function(){

      //var chkBox = $('<input type="checkbox" name="homwork" value="Math">');
      var input = $("<textarea name='plans' rows='1'" +
                   "cols='30' class='scheduleText'></textarea><br>").text("Example");

      var endOfList = this.parentElement.lastElementChild;
      //endOfList.after(chkBox);
      input.insertBefore(endOfList);
    });

    $( ".scheduleText" ).keyDown(function(){

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
