;(function(exports) {
  function Keyboard (element) {
	  this.element = element;
	  this.build();
  }

  Keyboard.prototype.build = function () {
	  for (var num in QWERTYDICT) {
		  var keySquare = new Key(QWERTYDICT[num]);
		  this.element.appendChild(keySquare.contents);
	  }
  }

  Keyboard.prototype.setExpectedKeys = function () {

  }

  function Key (letter) {
	  this.letter = letter;
	  this.contents = document.createElement("li");
	  this.contents.setAttribute("class","letter key_"+this.letter);
	  this.contents.innerHTML = this.letter;
  }

  exports.Keyboard = Keyboard;
})(this);
