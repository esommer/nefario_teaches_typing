;(function(exports) {
  var Scoreboard = function(document) {
    this.score = 0;
    this.lives = 10;
    this.setupView(document);
  };

  Scoreboard.prototype.setupView = function (document) {
	  var scoreDiv = document.createElement("div");
	  scoreDiv.setAttribute("id", "scorediv");
	  document.body.appendChild(scoreDiv);

	  var livesDiv = document.createElement("div");
	  livesDiv.setAttribute("id", "livesdiv");
	  document.body.appendChild(livesDiv);

    this.draw = function() {
	    scoreDiv.innerHTML = this.score;
	    livesDiv.innerHTML = this.lives;
    };
  }

  exports.Scoreboard = Scoreboard;
})(this);
