$(function(){
	setTimeout(function() {
		$('#initGame').click();
	}, 1000);
});

window.$game = {
	init: function(canvas){
		this.log('Init Canvas');
		window.$imgs 	= new imagenes();
		window.$lienzo 	= canvas;
		window.$play 	= false;
		window.$tap 	= new tapPlacard(35, 75, 10, 10, "tap");

		document.onkeydown = this.onkeydown;
        document.onkeyup = this.onkeyup;
	},
	support: function(id_canvas){
		var canvas = document.getElementById(id_canvas);
		if (canvas.getContext){
			this.log('Support Canvas');
			this.init(canvas.getContext('2d'));
			return true;
		} else {
			this.log('Your browser does not support the HTML5 canvas tag');
			return false;
		}
	},
	initGame: function(id_canvas){
		if(this.support(id_canvas)){
			this.createImages();
		}
	},
	createImages: function(){
		this.log('Create Images');
		this.log('Bg');
		$imgs.add("bg", "http://test.altiviaot.com/game/assets/imgs/bg2.png");

		this.log('Bird');
		$imgs.add("bird", "http://test.altiviaot.com/game/assets/imgs/bird.png");

		this.log('Getready');
		$imgs.add("getready", "http://test.altiviaot.com/game/assets/imgs/getready.png");

		this.log('Pause');
		$imgs.add("pause", "http://test.altiviaot.com/game/assets/imgs/pause.png");

		this.log('Tap');
		$imgs.add("tap", "http://test.altiviaot.com/game/assets/imgs/tap.png");

		this.loadImages();
	},
	loadImages: function(){
		// if(!$imgs.isLoaded()){
			this.clear();

			this.log('Load Images');
			this.log('Bg');
			$lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);

			this.log('Bird');
			$lienzo.drawImage($imgs.get("bird"), 30, 50, 20, 20);

			this.log('Getready');
			$lienzo.drawImage($imgs.get("getready"), 95, 15, 120, 20);

			this.log('Pause');
			$lienzo.drawImage($imgs.get("pause"), 285, 5, 10, 10);

			this.log('Tap');
			$tap.brush($lienzo);

			if($imgs.isLoaded()){
				this.log('Loaded');
				// this.gameLoop();
			} else {
				this.log('No Loaded');
			}	
		// }
	},
	gameLoop: function () {
		this.getRequestAnimationFrame(this.gameLoop);
		this.loadImages();
	},
	getRequestAnimationFrame: function(callback){
       	window.setTimeout(callback, 1000 / 60);
	},
	onkeydown:  function(e){
		if(e.keyCode == 32) { // Espace
            // HERE
        } else if (e.keyCode == 27) { // ESC
            // HERE
        }
	},
	onkeyup:  function(e){
		if(e.keyCode == 32) {
            // HERE
        }
	},
	waitActions:  function(){

	},
	startGame: function(){

	},
	clear: function(){		
		this.log('Clear Images');
		// $lienzo.clearRect(0, 0, $lienzo.width, $lienzo.height);
	},
	log: function(value){
		console.log(value);
	}
};