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

  var setupInputListener = function(game) {
	  document.addEventListener("keydown", function(keyObj) {
		  game.keyInput(keyObj);
	  }, false);
  };

  window.onload = function() {
	  var game = new Game(document, "canvas", 1000, 400);
    setUpGameTick();
    setupInputListener(game);
    startGameLoop(game);
  }
})(this);
