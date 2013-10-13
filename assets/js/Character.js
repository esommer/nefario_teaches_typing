function Character (canvas, ctx) { 
	this.width =  30;
	this.height = 60;
	this.defaultSpeedX = 1;
	this.defaultSpeedY = 0;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;
	this.x = 0;
	this.y = this.canvasHeight - this.height;
	this.speedX = this.defaultSpeedX;
	this.speedY = this.defaultSpeedY;
	this.state = "normal";
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

Character.prototype.move = function(speedX,speedY) {
	if (speedX, speedY) {
		this.speedX = speedX;
		this.speedY = speedY;
	}
	var x = this.x + this.speedX;
	var y = this.y - this.speedY;
	this.moveTo(x, y);
}

Character.prototype.unBlock = function () {
	this.speedX = this.defaultSpeedX;
}