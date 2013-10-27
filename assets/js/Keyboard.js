;(function(exports) {
  function Keyboard (element) {
	  this.element = element;
	  this.build();
  }

  Keyboard.prototype.build = function () {
    var qwertydict = {
	    0 : "~", 1 : "1", 2 : "2", "27":"esc", 65:"a", 66:"b", 67:"c", 68:"d",
      69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m",
      78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v",
      87:"w", 88:"x", 89:"y", 90:"z", 186:";"
    };

	  for (var num in qwertydict) {
		  var keySquare = new Key(qwertydict[num]);
		  this.element.appendChild(keySquare.contents);
	  }
  }

  function Key (letter) {
	  this.letter = letter;
	  this.contents = document.createElement("li");
	  this.contents.setAttribute("class","letter key_"+this.letter);
	  this.contents.innerHTML = this.letter;
  }

  exports.Keyboard = Keyboard;
})(this);
