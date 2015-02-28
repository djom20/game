$(function(){
	$game.support();
});

window.$game = {
	init: function(canvas){
		this.log('Init Canvas');
		window.$lienzo 	= canvas;
		window.$imgs 	= new imagenes();
		this.log(canvas);
		$lienzo.fillStyle = "#fff";

		this.createImages();
	},
	support: function(){
		var canvas = document.getElementById('lienzo');
		if (canvas.getContext){
			this.log('Support Canvas');
			this.init(canvas.getContext('2d'));
		} else {
			this.log('No support Canvas');
		}
	},
	createImages: function(){
		this.log('Create Images');
		$imgs.add("fondo","./assets/imgs/bg2.png");
		this.log($imgs.get("fondo"));
		// while (true) {
			$lienzo.drawImage($imgs.get("fondo"),10, 10, 100, 100);
		// }
	},
	log: function(value){
		console.log(value);
	}
};