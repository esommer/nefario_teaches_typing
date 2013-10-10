(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
								setTimeout(callback, 1000/60);
							};
  window.requestAnimationFrame = requestAnimationFrame;
})();
window.onload = function() {
	var game = new Game(1000, 400);
	var windowLoop = function() {
		requestAnimationFrame(windowLoop);
		game.loop();
	};
	windowLoop();
}

