function LetterBlock (canvas, letter, type) {
	this.letter = letter;
	this.type = (type == 1)? "low": "high";
	this.width = 30;
	this.height = 30;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;
	this.x = this.canvasWidth;
	this.y = this.type == "low"? this.canvasHeight - this.height: this.canvasHeight - this.height - 100;
	this.speedX = 0;
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

LetterBlock.prototype.move = function(directionX, directionY, speedX, speedY) {
	this.speedX = speedX;
	this.speedY = speedY;
	var x = this.x + (this.speedX * directionX);
	var y = this.y - (this.speedY * directionY);
	this.moveTo(x, y);
}