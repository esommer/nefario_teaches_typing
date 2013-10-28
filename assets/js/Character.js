
;(function(exports) {
  function Character (ctx, gameWidth, gameHeight, initialSpeedX, initialSpeedY) {
	  this.width =  30;
	  this.height = 60;
	  this.defaultSpeedX = 1;
	  this.ctx = ctx;
	  this.x = 0;
	  this.y = gameHeight - this.height;
	  this.cyclesPerFrame = 4;
	  this.moveCycles = 0;
	  this.currentFrame = 0;
	  this.speedX = initialSpeedX;
	  this.speedY = initialSpeedY;
	  this.frames = buildFrames();

    var blocked, speedX;
    this.block = function () {
	    blocked = true;
    };

    this.unBlock = function () {
      this.speedX = this.defaultSpeedX;
      blocked = false;
    };

    this.unBlock();
  }

  var buildFrames = function() {
    return ["one.png", "two.png", "three.png", "four.png"].map(function(x) {
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


  Character.prototype.setPosition = function(x, y) {
	  this.x = x;
	  this.y = y;
  }

  Character.prototype.move = function( ) {
	  var x = this.x + this.speedX;
	  this.setPosition(x, this.y);
	  this.currentFrame = Math.floor((this.moveCycles/this.cyclesPerFrame)%this.frames.length);
	  this.moveCycles ++;
  }

  exports.Character = Character;
})(this);
