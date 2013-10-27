;(function(exports) {
  var qwertydict = {
	  0 : "~", 1 : "1", 2 : "2", "27":"esc", 65:"a", 66:"b", 67:"c", 68:"d",
    69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m",
    78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v",
    87:"w", 88:"x", 89:"y", 90:"z", 186:";"
  };

  function Keyboard (document, element) {
    this.display(document, element);
  }

  Keyboard.prototype.display = function (document, element) {
	  for (var num in qwertydict) {
      var letter = qwertydict[num];
	    var contents = document.createElement("li");
	    contents.setAttribute("class","letter key_" + letter);
	    contents.innerHTML = letter;
		  element.appendChild(contents);
	  }
  };

  exports.Keyboard = Keyboard;
})(this);
