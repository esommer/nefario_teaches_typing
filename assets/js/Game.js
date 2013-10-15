function Game (dict) {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.score = 0;
	this.countKeyPress = 0;
	this.countMistake = 0;
	this.startTime = 0;
	this.currentLevel = window.levels[1];
	this.blocks = [];
	this.frameCount = 0;
	this.keyDict = dict;
	this.playerSpeed = 0;
	this.keysPerMin = 0;

	this.state = "running";
	this.keysDiv = document.getElementById("keyspeed");
	this.livesDiv = document.getElementById("lives");
	this.scoreDiv = document.getElementById("score");
	this.keyboard = new Keyboard(document.getElementById("keyboard"));
	this.timer = new Timer(document.getElementById("timer"));
	this.character = new Character(this.canvas, this.ctx, this.currentLevel.characterSpeedX, this.currentLevel.characterSpeedY);
}

Game.prototype.makeLetterBlock = function() {
	var letterType = Math.floor(Math.random()*2);
	var randIndex = Math.floor(Math.random()*this.currentLevel.contents.length);
	var letter = this.currentLevel.contents[randIndex];
	var block = new LetterBlock(this.canvas, letter, letterType, this.currentLevel.keySpeedX, this.currentLevel.keySpeedY);
	this.blocks.push(block);
}

Game.prototype.clearCanvas = function() {
	this.ctx.fillStyle = "#fff";
	this.ctx.fillRect(0, 0, this.width, this.height);
}

Game.prototype.keyInput = function(keyObj) {
	// check for pause/resume button (escape key)
	if (keyObj.keyCode && this.keyDict[keyObj.keyCode] == "esc") {
		this.state == "running"? this.pause(): this.resume();
	}
	else {
		this.countKeyPress ++;
		this.keysPerMin = this.countKeyPress / this.timer.elapsed;
		var output = '';
		if (keyObj.keyCode && this.keyDict[keyObj.keyCode]) {
			output = this.keyDict[keyObj.keyCode];
		}
		if (this.blocks.length > 0 && output == this.blocks[0].letter) {
			this.correctKey();
		} else {
			this.wrongKey();
		}
	}
}

Game.prototype.wrongKey = function () {
	this.errorCount ++;
	this.character.lives --;
	if (this.character.lives <= 0) {
		this.endDie();
	}
}

Game.prototype.correctKey = function() {
	this.blocks.shift();
	if (this.character.state == "blocked") {
		this.character.unBlock();
	}
	this.score ++;
}

Game.prototype.checkCollisions = function() {
	var characterLeft = Math.round(this.character.x + this.character.width);
	var firstBlockRight = Math.floor(this.blocks[0].x);
	if (characterLeft == firstBlockRight || Math.abs(firstBlockRight - characterLeft) < 2) {
		this.character.x = this.blocks[0].x - this.character.width;
		this.character.speedX = this.blocks[0].speedX;
		this.character.state = "blocked";
	}
	if (this.character.x >= this.width) {
		this.pause();
	}
}

Game.prototype.drawTallies = function () {
	this.scoreDiv.innerHTML = this.score;
	this.livesDiv.innerHTML = this.character.lives;
	this.keysDiv.innerHTML = this.keysPerMin;
}

Game.prototype.pause = function () {
	this.state = "paused";
	this.timer.pausedTime = this.timer.elapsed;
}

Game.prototype.resume = function () {
	this.state = "running";
	this.timer.referenceTime = Date.now();
}

Game.prototype.endDie = function () {
	this.pause();
	console.log(" --- dead --- ");
}

Game.prototype.setLevel = function (level) {
	//set level defaults (speeds, starting lives, letter set, etc.)
}

Game.prototype.loop = function () {
	this.frameCount ++;
	this.clearCanvas();
	
	// check
	if (this.blocks.length > 0) {
		this.checkCollisions();
	}

	if (this.state == "running") {
		// update
		this.timer.update();
		if (this.frameCount % this.currentLevel.blockFrequency == 0)  {
			this.makeLetterBlock();
		}
		this.character.move();
		for (i = 0; i < this.blocks.length; i++){
			this.blocks[i].move();
		}
	}
	

	// draw
	this.timer.draw();
	this.drawTallies();
	this.character.draw();
	for(i = 0; i < this.blocks.length; i++) {
		this.blocks[i].draw();
	}
}