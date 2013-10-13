// PREPARE APPROPRIATE ANIMATION FRAME LOOPER
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
								setTimeout(callback, 1000/60);
							};
  window.requestAnimationFrame = requestAnimationFrame;
})();

window.onload = function() {
	var game = new Game();
	var windowLoop = function() {
		requestAnimationFrame(windowLoop);
		game.loop();
	};
	var acceptInput = function(keyObj) {
		game.keyInput(keyObj);
	}
	document.addEventListener("keydown",acceptInput,false);
	windowLoop();
}

