$(function(){
	$game.support();
});

window.$game = {
	init: function(){
		window.$lienzo = null;
	},
	support: function(){
		this.init();

		var canvas = document.getElementById('lienzo');
		if (canvas.getContext){
		  	$lienzo = canvas.getContext('2d');
		  	// drawing code here
		} else {
			this.log('No support Canvas');
		}
	},
	log: function(value){
		console.log(value);
	}
};