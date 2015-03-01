$(function(){
	setTimeout(function() {
		$('#initGame').click();
	}, 1000);
});

window.$game = {
	init: function(canvas){
		this.log('Init Canvas');
		window.$imgs 	= new imagenes();
		window.$lienzo 	= canvas.getContext('2d');
		window.$init 	= false;
		window.$play 	= false;
		window.$level 	= 1;
		window.$x 		= 0;
		window.$y 		= 0;

		window.$tap 	= new tapPlacard(35, 75, 10, 10, "tap");
		window.$bPause 	= new button(280, 0, 10, 10, "pause");
		window.$bPlay 	= new button(130, 100, 10, 10, "start");

		// canvas.addEventListener("onkeydown", this.onkeydown);
		document.onkeydown 	= this.onkeydown;
        document.onkeyup 	= this.onkeyup;
	},
	support: function(id_canvas){
		var canvas = document.getElementById(id_canvas);
		if (canvas.getContext){
			this.log('Support Canvas');
			this.init(canvas);
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
		var imgs = ['bg','bird','getready','pause','tap','title','start'];

		for (var i = 0; i < imgs.length; i++) {
			$imgs.add(imgs[i], "http://test.altiviaot.com/game/assets/imgs/" + imgs[i] + ".png");
		}

		this.loadImages();
	},
	loadImages: function(){
		this.clear();

		this.log('Load Images');
		$lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);
		$lienzo.drawImage($imgs.get("bird"), 30, 50, 20, 20);
		$lienzo.drawImage($imgs.get("getready"), 95, 15, 120, 20);

		$tap.brush($lienzo);

		if($imgs.isLoaded()){
			this.log('Loaded');
		} else {
			this.log('No Loaded');
			// this.loadImages();
		}
	},
	gameLoop: function () {
		this.getRequestAnimationFrame(this.gameLoop);
		this.startLevel();
	},
	getRequestAnimationFrame: function(callback){
       	window.setTimeout(callback, 1000 / 60);
	},
	onkeydown: function(e){
		if(e.keyCode == 32) { // Espace
            $game.playGame();
        } else if (e.keyCode == 27) { // ESC
            $game.pauseGame();
        } else if (e.keyCode == 13) { // Enter
            $game.playGame(2);
        }
	},
	onkeyup: function(e){
		if(e.keyCode == 32) {
            // HERE
        }
	},
	waitActions: function(){

	},
	playGame: function(e){
		this.log('Start Game');
		if(!$play && !$init){
        	$play = true;
        	$init = true;

			this.clear();
			this.startLevel();
        }else if(!$play && $init && e == 2){
        	$play = true;

			this.clear();
			this.startLevel();
        }
	},
	restartGame: function(){

	},
	pauseGame: function(){
		if($init){
			$play = false;

			this.clear();
			$lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);
			$lienzo.drawImage($imgs.get("title"), 100, 15, 100, 40);

			$bPlay.brush($lienzo);
		}
	},
	startLevel: function(){
		if($level == 1){
			$lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);
			$lienzo.drawImage($imgs.get("bird"), 30, 50, 20, 20);

			$bPause.brush($lienzo);
		} else if($level == 2){

		}
	},
	clear: function(){		
		this.log('Clear Images');
		// $lienzo.clearRect(0, 0, $lienzo.width, $lienzo.height);
	},
	log: function(value){
		console.log(value);
	}
};