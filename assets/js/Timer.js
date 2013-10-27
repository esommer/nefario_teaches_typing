;(function(exports) {
  function Timer(document) {
	  this.start = Date.now();
	  this.elapsed = 0;
	  this.display = "";
	  this.referenceTime = this.start;
	  this.pausedTime = 0;
    this.setupView(document);
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
	  this.elapsed = Date.now() - this.referenceTime + this.pausedTime;
	  var hours = padNumber((Math.floor(this.elapsed/3600000))%24);
	  var mins = padNumber((Math.floor(this.elapsed/60000))%60);
	  var secs = padNumber((Math.floor(this.elapsed/1000))%60);
	  this.display = hours + ":" + mins + ":" + secs;
  }

  Timer.prototype.setupView = function(document) {
	  var timerDiv = document.createElement("div");
	  timerDiv.setAttribute("id", "timer");
	  document.body.appendChild(timerDiv);
    this.draw = function() {
      timerDiv.innerHTML = this.display;
    };
  };

  exports.Timer = Timer;
})(this);
