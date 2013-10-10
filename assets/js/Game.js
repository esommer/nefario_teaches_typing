function Game (width, height) {
	this.canvas = null;
	this.ctx = null;
	this.width = width;
	this.height = height;
	this.score = 0;
	this.countKeyPress = 0;
	this.countMistake = 0;
	this.startTime = 0;
	this.character = null;

	this.createCanvas();
	this.character = new Character(this.ctx, 10, 10, 10, 10, .5, 0);
}

Game.prototype.createCanvas = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.style.width = this.width;
	this.canvas.style.height = this.height;
	this.ctx = this.canvas.getContext("2d");

	document.body.appendChild(this.canvas);
}

Game.prototype.clearCanvas = function() {
	this.ctx.fillStyle = "#fff";
	this.ctx.fillRect(0, 0, this.width, this.height);
}

Game.prototype.loop = function() {
	this.clearCanvas();
	// check

	// update
	this.character.move(1,0);

	// draw
	this.character.draw();
}




