function Character (canvas, ctx) { 
	this.width =  30;
	this.height = 60;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;
	this.x = 0;
	this.y = this.canvasHeight - this.height;
	this.speedX = 0;
	this.speedY = 0;
}

Character.prototype.draw = function() {
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.fillStyle = "#ccc";

	this.ctx.fillRect(this.x, this.y, this.width, this.height);
	this.ctx.restore();
};

Character.prototype.moveTo = function(x, y) {
	this.x = x;
	this.y = y;
}

Character.prototype.move = function(directionX, directionY, speedX, speedY) {
	this.speedX = speedX;
	this.speedY = speedY;
	var x = this.x + (this.speedX * directionX);
	var y = this.y - (this.speedY * directionY);
	this.moveTo(x, y);
}