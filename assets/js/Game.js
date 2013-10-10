function Game () {
	this.canvas = null;
	this.ctx = null;
	this.width = 1000;
	this.height = 400;
	this.score = 0;
	this.countKeyPress = 0;
	this.countMistake = 0;
	this.startTime = 0;
	this.character = null;
	this.levels = {
		1: ["a","s","d","f","j","k","l",";"],
		2: []
	}
	this.currentLevel = 1;
	this.blocks = [];
	this.frameCount = 0;
	this.keyDict = {
		65:"A", 66:"B", 67:"C",	68:"D",	69:"E",	70:"F",	71:"G",	72:"H",	73:"I",	74:"J",	75:"K",	76:"L",	77:"M",	78:"N",	79:"O",	80:"P",	81:"Q",	82:"R",	83:"S",	84:"T",	85:"U",	86:"V",	87:"W",	88:"X",	89:"Y",	90:"Z", 186:";"
	};

	this.createCanvas();
	this.character = new Character(this.canvas, this.ctx);
}

Game.prototype.createCanvas = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ctx = this.canvas.getContext("2d");

	document.body.appendChild(this.canvas);
}

Game.prototype.makeLetterBlock = function() {
	var letterType = Math.floor(Math.random()*2);
	var randIndex = Math.floor(Math.random()*this.levels[this.currentLevel].length);
	var letter = this.levels[this.currentLevel][randIndex];
	var block = new LetterBlock(this.canvas, letter, letterType);
	this.blocks.push(block);
}

Game.prototype.clearCanvas = function() {
	this.ctx.fillStyle = "#fff";
	this.ctx.fillRect(0, 0, this.width, this.height);
}

Game.prototype.loop = function() {
	this.frameCount ++;
	this.clearCanvas();
	// check

	// update
	if (this.frameCount % 120 == 0)  {
		this.makeLetterBlock();
	}
	this.character.move(1,0,0.2,0);
	for (i = 0; i < this.blocks.length; i++){
		this.blocks[i].move(-1,0,0.4,0);
	}

	// draw
	this.character.draw();
	for(i = 0; i < this.blocks.length; i++) {
		this.blocks[i].draw();
	}
}

Game.prototype.keyInput = function(keyObj) {
	this.countKeyPress ++;
	var output = '';
	if (keyObj.keyCode) {
		console.log(this.keyDict[76]);
		output = this.keyDict[keyObj.keyCode].toLowerCase();
	}
	if (output == this.blocks[0].letter) { 
		this.blocks.shift();
	} else {
		this.errorCount ++;
	}
}





