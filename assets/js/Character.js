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
	this.cyclesPerFrame = 4;
	this.moveCycles = 0;
	this.currentFrame = 0;
	this.lives = 10;

	this.frames = [];
	this.buildFrames();
}

Character.prototype.buildFrames  = function() {
	var frameOne = new Image();
	frameOne.src = "assets/img/one.png";
	var frameTwo = new Image();
	frameTwo.src = "assets/img/two.png";
	var frameThree = new Image();
	frameThree.src = "assets/img/three.png";
	var frameFour = new Image();
	frameFour.src = "assets/img/four.png";
	this.frames = [frameOne, frameTwo, frameThree, frameFour];
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