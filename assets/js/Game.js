;(function(exports) {
  function Game () {
	  this.options = {

	  }
	  this.canvas = null;
	  this.ctx = null;
	  this.width = 1000;
	  this.height = 400;
	  this.score = 0;
	  this.countKeyPress = 0;
	  this.countMistake = 0;
	  this.startTime = 0;
	  this.character = null;
	  // this.levels = {
	  // 	1: ["a","s","d","f","j","k","l",";"],
	  // 	2: []
	  // }
	  this.currentLevel = window.levels[1];
	  this.blocks = [];
	  this.frameCount = 0;
	  this.keyDict = {
		  27:"esc", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 186:";"
	  };
	  this.timerDiv = "";
	  this.state = "running";
	  this.score = 0;
	  this.livesDiv = "";
	  this.scoreDiv = "";

	  this.keyboard = new Keyboard(document, document.getElementById("keyboard"));
	  this.createCanvas();
	  this.initiateTimer();
	  this.initiateTallies();
	  this.timer = new Timer();
	  this.character = new Character(this.canvas, this.ctx);
  }

  Game.prototype.createCanvas = function() {
	  this.canvas = document.createElement("canvas");
	  this.canvas.width = this.width;
	  this.canvas.height = this.height;
	  this.ctx = this.canvas.getContext("2d");

	  document.body.appendChild(this.canvas);
  }

  Game.prototype.initiateTimer = function() {
	  this.timerDiv = document.createElement("div");
	  this.timerDiv.setAttribute("id", "timer");
	  document.body.appendChild(this.timerDiv);
  }

  Game.prototype.initiateTallies = function () {
	  // build score div
	  this.scoreDiv = document.createElement("div");
	  this.scoreDiv.setAttribute("id", "scorediv");
	  document.body.appendChild(this.scoreDiv);
	  // build lives div
	  this.livesDiv = document.createElement("div");
	  this.livesDiv.setAttribute("id", "livesdiv");
	  document.body.appendChild(this.livesDiv);
  }

  Game.prototype.makeLetterBlock = function() {
	  var letterType = Math.floor(Math.random()*2);
	  var randIndex = Math.floor(Math.random()*this.currentLevel.contents.length);
	  var letter = this.currentLevel.contents[randIndex];
	  var block = new LetterBlock(this.canvas, letter, letterType);
	  this.blocks.push(block);
  }

  Game.prototype.clearCanvas = function() {
	  this.ctx.fillStyle = "#fff";
	  this.ctx.fillRect(0, 0, this.width, this.height);
  }

  Game.prototype.keyInput = function(keyObj) {
	  // check for pause/resume button (escape key)
	  if (keyObj.keyCode && this.keyDict[keyObj.keyCode] == "esc") {
		  this.state == "running"? this.pause(): this.resume();
	  }
	  else {
		  this.countKeyPress ++;
		  var output = '';
		  if (keyObj.keyCode && this.keyDict[keyObj.keyCode]) {
			  output = this.keyDict[keyObj.keyCode];
		  }
		  if (this.blocks.length > 0 && output == this.blocks[0].letter) {
			  this.correctKey();
		  } else {
			  this.wrongKey();
		  }
	  }
  }

  Game.prototype.wrongKey = function () {
	  this.errorCount ++;
	  this.character.lives --;
	  if (this.character.lives <= 0) {
		  this.endDie();
	  }
  }

  Game.prototype.correctKey = function() {
	  this.blocks.shift();
	  if (this.character.state == "blocked") {
		  this.character.unBlock();
	  }
	  this.score ++;
  }

  Game.prototype.checkCollisions = function() {
	  var characterLeft = Math.round(this.character.x + this.character.width);
	  var firstBlockRight = Math.floor(this.blocks[0].x);
	  if (characterLeft == firstBlockRight || Math.abs(firstBlockRight - characterLeft) < 2) {
		  this.character.x = this.blocks[0].x - this.character.width;
		  this.character.speedX = this.blocks[0].speedX;
		  this.character.state = "blocked";
	  }
  }

  Game.prototype.drawTallies = function () {
	  this.scoreDiv.innerHTML = this.score;
	  this.livesDiv.innerHTML = this.character.lives;
  }

  Game.prototype.pause = function () {
	  this.state = "paused";
	  this.timer.pausedTime = this.timer.elapsed;
  }

  Game.prototype.resume = function () {
	  this.state = "running";
	  this.timer.referenceTime = Date.now();
  }

  Game.prototype.endDie = function () {
	  this.pause();
	  console.log(" --- dead --- ");
  }

  Game.prototype.setLevel = function (level) {
	  //set level defaults (speeds, starting lives, letter set, etc.)
  }

  Game.prototype.loop = function () {
	  this.frameCount ++;
	  this.clearCanvas();

	  // check
	  if (this.blocks.length > 0) {
		  this.checkCollisions();
	  }

	  if (this.state == "running") {
		  // update
		  this.timer.update();
		  if (this.frameCount % this.currentLevel.blockFrequency == 0)  {
			  this.makeLetterBlock();
		  }
		  this.character.move();
		  for (i = 0; i < this.blocks.length; i++){
			  this.blocks[i].move();
		  }
	  }


	  // draw
	  this.timer.draw(this.timerDiv);
	  this.drawTallies();
	  this.character.draw();
	  for(i = 0; i < this.blocks.length; i++) {
		  this.blocks[i].draw();
	  }
  }

  exports.Game = Game;
})(this);
