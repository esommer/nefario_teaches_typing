function Timer() {
	this.start = Date.now();
	this.elapsed = 0;
	this.display = "";
}

Timer.prototype.update = function() {
	function padNumber(number) {
		if (number === 0) {
			return '00';
		} else if (number < 10) {
			return '0' + number;
		} else {
			return number;
		}
	}
	this.elapsed = Date.now() - this.start;
	var hours = padNumber((Math.floor(this.elapsed/3600000))%24);
	var mins = padNumber((Math.floor(this.elapsed/60000))%60);
	var secs = padNumber((Math.floor(this.elapsed/1000))%60); 
	this.display = hours + ":" + mins + ":" + secs;
}

Timer.prototype.draw = function(timerHTML) {
	timerHTML.innerHTML = this.display;
}