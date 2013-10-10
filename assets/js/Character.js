function Character (ctx, width, height, x, y, speedX, speedY) {
	this.width =  width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = speedX;
	this.speedY = speedY;
	this.ctx = ctx;
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

Character.prototype.move = function(directionX, directionY) {
	var x = this.x + (this.speedX * directionX);
	var y = this.y - (this.speedY * directionY);
	this.moveTo(x, y);
}