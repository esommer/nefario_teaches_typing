;(function(exports) {
  function Character (ctx, gameWidth, gameHeight) {
	  this.width =  30;
	  this.height = 60;
	  this.defaultSpeedX = 1;
	  this.defaultSpeedY = 0;
	  this.ctx = ctx;
	  this.x = 0;
	  this.y = gameHeight - this.height;
	  this.speedX = this.defaultSpeedX;
	  this.speedY = this.defaultSpeedY;
	  this.state = "normal";
	  this.cyclesPerFrame = 4;
	  this.moveCycles = 0;
	  this.currentFrame = 0;

	  this.frames = [];
	  this.buildFrames();
  }

  Character.prototype.buildFrames  = function() {
    this.frames = ["one.png", "two.png", "three.png", "four.png"].map(function(x) {
	    var frame = new Image();
	    frame.src = "assets/img/" + x;
      return frame;
	  });
  }

  Character.prototype.draw = function() {
	  this.ctx.save();
	  this.ctx.beginPath();
	  this.ctx.fillStyle = "#ccc";

	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	  this.ctx.drawImage(this.frames[this.currentFrame], this.x-5, this.y);
	  this.ctx.restore();
  };

  Character.prototype.moveTo = function(x, y) {
	  this.x = x;
	  this.y = y;
  }

  Character.prototype.move = function(speedX,speedY) {
	  if (speedX, speedY) {
		  this.speedX = speedX;
		  this.speedY = speedY;
	  }
	  var x = this.x + this.speedX;
	  var y = this.y - this.speedY;
	  this.moveTo(x, y);
	  this.currentFrame = Math.floor((this.moveCycles/this.cyclesPerFrame)%this.frames.length);
	  this.moveCycles ++;
  }

  Character.prototype.unBlock = function () {
	  this.speedX = this.defaultSpeedX;
  }

  exports.Character = Character;
})(this);
