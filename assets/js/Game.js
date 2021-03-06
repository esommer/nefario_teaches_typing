<<<<<<< Updated upstream

;(function(exports) {
  function Game (document, canvasId, width, height) {
	  this.ctx = drawing.setupCanvas(canvasId, width, height);
	  this.width = width;
	  this.height = height;
	  this.countKeyPress = 0;
	  this.countMistake = 0;
	  this.startTime = 0;
	  this.currentLevel = window.levels[1];
	  this.blocks = [];
	  this.frameCount = 0;
	  this.state = "running";

      this.scoreboard = new Scoreboard(document);
	  this.keyboard = new Keyboard(document, document.getElementById("keyboard"));
	  this.timer = new Timer(document);
	  this.character = new Character(this.ctx, width, height, 1, 0);
  }

  Game.keys = {
	  0 : "~", 1 : "1", 2 : "2", "27":"esc", 65:"a", 66:"b", 67:"c", 68:"d",
    69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m",
    78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v",
    87:"w", 88:"x", 89:"y", 90:"z", 186:";"
  };

  // worth putting input stuff into its own module

  Game.prototype.keyInput = function(keyObj) {
	  // check for pause/resume button (escape key)
	  if (keyObj.keyCode && Game.keys[keyObj.keyCode] == "esc") {
		  this.state == "running"? this.pause(): this.resume();
	  }
	  else {
		  this.countKeyPress ++;
		  if (keyObj.keyCode &&
          Game.keys[keyObj.keyCode] &&
          this.blocks.length > 0 &&
          Game.keys[keyObj.keyCode] === this.blocks[0].letter) {
			  this.correctKey();
		  } else {
			  this.wrongKey();
		  }
	  }
  }

  Game.prototype.wrongKey = function () {
	  this.errorCount ++;
	  this.scoreboard.lives --;
	  if (this.scoreboard.lives <= 0) {
		  this.endDie();
	  }
  }

  Game.prototype.correctKey = function() {
	  this.blocks.shift();
		this.character.unBlock();
	  this.scoreboard.score++;
  }

  Game.prototype.checkCollisions = function() {
	  if (this.blocks.length === 0) return;

	  var characterLeft = Math.round(this.character.x + this.character.width);
	  var firstBlockRight = Math.floor(this.blocks[0].x);
	  if (characterLeft == firstBlockRight || Math.abs(firstBlockRight - characterLeft) < 2) {
		  this.character.x = this.blocks[0].x - this.character.width;
		  this.character.speedX = this.blocks[0].speedX;
		  this.character.block();
	  }
  }

  // worth formalising states into a proper state machine with
  // transition fns and allowable transitions.  We can talk through
  // how to do this.
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

  Game.prototype.update = function() {
	  this.frameCount ++;
	  this.checkCollisions();

	  if (this.state == "running") {
		  // update
		  this.timer.update();
		  if (this.frameCount % this.currentLevel.blockFrequency == 0)  {
			  this.blocks.push(new LetterBlock(this.ctx, this.width, this.height, this.currentLevel.contents, -0.7, 0));
		  }
		  this.character.move();
		  for (i = 0; i < this.blocks.length; i++){
			  this.blocks[i].move();
		  }
	  }
  };

  Game.prototype.draw = function() {
	  drawing.clearCanvas(this.ctx, this.width, this.height);
	  this.timer.draw();
	  this.scoreboard.draw();
	  this.character.draw();
	  for(i = 0; i < this.blocks.length; i++) {
		  this.blocks[i].draw();
	  }
  };

  Game.prototype.loop = function () {
    this.update();
    this.draw();
  }

  var drawing = {
    setupCanvas: function(canvasId, width, height) {
	    var canvas = document.getElementById(canvasId);
	    canvas.width = width;
	    canvas.height = height;
	    return canvas.getContext("2d");
    },

    clearCanvas: function(ctx, gameWidth, gameHeight) {
	    ctx.fillStyle = "#fff";
	    ctx.fillRect(0, 0, gameWidth, gameHeight);
    }
  };

  exports.Game = Game;
})(this);
