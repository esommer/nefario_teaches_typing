(function (exports) {
	var levels = {
		"1": {
			contents: ["a","s","d","f","j","k","l",";"],
			blockFrequency: 30,
			keySpeedX: -3,
			keySpeedY: 0,
			characterSpeedX: 1,
			characterSpeedY: 0,
			//drawBK: doSomething
		},
		"2": {}
	};
	//var doSomething = function () {

	//};
	//var someElseThing = function () {

	//};
	exports.levels = levels;
	//exports.levels.someElseThing = someElseThing;
})(this);


//levels["1"].drawBK(); // this will provide us access to our doSomething function.

// each module exports one thing. glom on what you need to exports.
// head.js (loader)