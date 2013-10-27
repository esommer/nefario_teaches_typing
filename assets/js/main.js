;(function(exports) {
  var setUpGameTick = function() {
    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
				setTimeout(callback, 1000/60);
			};
  };

  var startGameLoop = function(game) {
	  requestAnimationFrame(function windowLoop() {
		  game.loop();
		  requestAnimationFrame(windowLoop);
	  });
  };

  window.onload = function() {
    setUpGameTick();
	  var game = new Game();
	  var acceptInput = function(keyObj) {
		  game.keyInput(keyObj);
	  }
	  document.addEventListener("keydown",acceptInput,false);
    startGameLoop(game);
  }
})(this);
