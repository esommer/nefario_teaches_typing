;(function(exports) {
  function LetterBlock (ctx, gameWidth, gameHeight, letters) {
	  this.letter = letters[Math.floor(Math.random() * letters.length)];
	  this.type = Math.floor(Math.random() * 2) === 1 ? "low": "high";
	  this.width = 30;
	  this.height = 30;
	  this.ctx = ctx;
	  this.x = gameWidth;
	  this.y = this.type == "low"? gameHeight - this.height: gameHeight - this.height - 100;
	  this.speedX = -0.7;
	  this.speedY = 0;
  }

  LetterBlock.prototype.draw = function() {
	  this.ctx.save();
	  this.ctx.beginPath();
	  this.ctx.fillStyle = "#ccc";
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	  this.ctx.textAlign = 'center';
	  this.ctx.font = '20px _Sans';
	  this.ctx.textBaseline = 'middle';
	  this.ctx.fillStyle = "#000";
	  this.ctx.fillText(this.letter,(this.x + (this.width/2)),(this.y + (this.height/2)));
	  this.ctx.restore();
  };

  LetterBlock.prototype.moveTo = function(x, y) {
	  this.x = x;
	  this.y = y;
  }

  LetterBlock.prototype.move = function(speedX, speedY) {
	  if (speedX && speedY) {
		  this.speedX = speedX;
		  this.speedY = speedY;
	  }
	  var x = this.x + this.speedX;
	  var y = this.y - this.speedY;
	  this.moveTo(x, y);
  }

  exports.LetterBlock = LetterBlock;
})(this);
