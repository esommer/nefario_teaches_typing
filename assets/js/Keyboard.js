;(function(exports) {
  function Keyboard (document, element) {
    this.display(document, element);
  }

  Keyboard.prototype.display = function (document, element) {
	  for (var num in Game.keys) {
      var letter = Game.keys[num];
	    var contents = document.createElement("li");
	    contents.setAttribute("class","letter key_" + letter);
	    contents.innerHTML = letter;
		  element.appendChild(contents);
	  }
  };

  exports.Keyboard = Keyboard;
})(this);
