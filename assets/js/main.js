$(function(){
	setTimeout(function() {
		$('#initGame').click();
	}, 1000);
});

window.$game = {
	init: function(canvas){
		this.log('Init Canvas');
		window.$imgs 	= new imagenes();
		window.$content	= canvas;
		window.$lienzo 	= canvas.getContext('2d');
		window.$init 	= false;
		window.$play 	= false;
		window.$level 	= 0;
		window.$x 		= 0;
		window.$y 		= 0;
		window.$world	= 0;
		window.$bird	= null;
        window.$walls 	= [];
        window.$wallsDimensions = null;

		window.$tap 	= new tapPlacard(35, 75, 10, 10, "tap");
		window.$bPause 	= new button(280, 0, 10, 10, "pause");
		window.$bPlay 	= new button(130, 100, 10, 10, "start");

		$content.addEventListener("click", this.onclick);
		document.onkeydown = this.onkeydown;
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
		this.playGame();
	},
	onkeydown: function(e){
		$game.log('Start');
		if (e.keyCode == 27) { // ESC
            $game.pauseGame();
        } else if (e.keyCode == 13) { // Enter
        	// Here Code
        }
	},
	onclick: function(e){
		if(!$init && !$play){
			$game.log('Start Game');
			$play 	= true;
			$init 	= true;
			$level 	= 1;
			$game.playGame();
		}
	},
	playGame: function(){
		this.createworld();
	},
	restartGame: function(){

	},
	pauseGame: function(){
		if($init){
            // console.log('It pause');
			$play = false;
			this.createworld();
		}
	},
	startLevel: function(){
		if($level == 1){
			this.createworld();
		}else if($level == 2){

		}
	},
	createworld: function(){
		var   b2Vec2 = Box2D.Common.Math.b2Vec2
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;

        $world = new b2World(
               new b2Vec2(0, 10)    //gravity
            ,  true                 //allow sleep
        );

        console.log('Play Game');

		if($init && $play){
	        if($level == 1){
		        var bodyDef 		= new b2BodyDef;         
				var fixDef 			= new b2FixtureDef;
				fixDef.density 		= 1.0;
				fixDef.friction 	= 0.5;
				fixDef.restitution 	= 0.2;

				var	_cw = $content.width,
					_ch = $content.height;

				// Dimensiones y posiciones de los muros
				$wallsDimensions = [
					//Eje X		Eje Y		Ancho		Alto
					{x:_cw/2,	y:  0,		w:_cw/2,	h:  1},	// Superior
					{x:_cw/2,	y:_ch-20,	w:_cw/2,	h:  1},	// Inferior
					{x:  0,		y:_ch/2,	w:  1,		h:_ch},	// Izquierda
					{x:_cw,		y:_ch/2,	w:  1,		h:_ch},	// Derecha
					{x:_cw/2,	y:200,		w:100,		h: 10}	// Muro de la parte inferior
				];

				// Generamos los muros
				for(var i=0;i<$wallsDimensions.length;i++){
					var wallDef = new b2BodyDef;	// Creamos un cuerpo o elemento nuevo
					wallDef.type = b2Body.b2_staticBody;	// Establecemos que sea estático
					wallDef.position.Set($wallsDimensions[i].x/30, $wallsDimensions[i].y/30);	// Establecemos su posición (1m=30px)
					  
					var fixture = new b2FixtureDef;	// Creamos una configuración de cuerpo nueva
					fixture.density = 10;		// Density determina el peso (irrelevante en este caso)
					fixture.friction = 0.5;		// Friction determina el roce con el resto de elementos
					fixture.restitution = 0.4;	// Capacidad de rebote (también determina el de los elementos que rebotan en el)
					  
					fixture.shape = new b2PolygonShape;	// Establecemos que será un polígono
					fixture.shape.SetAsBox($wallsDimensions[i].w/30, $wallsDimensions[i].h/30); // Estableceos sus dimensiones (1m=30px)
					  
					var wall = $world.CreateBody(wallDef);	// Añadimos al "mundo" el muro
					wall.CreateFixture(fixture);			// Establecemos la configuración del mundo
					  
					$walls.push(wall);	// Añadimos el muro a un Array que contiene los muros (para posteriormente disponer del elemento)
				}

				var debugDraw = new b2DebugDraw();	// Objeto de visualización de depuración
				debugDraw.SetSprite($lienzo);		// Establecemos el canvas para visualizarlo
				debugDraw.SetDrawScale(30);			// Escala de la visualización
				debugDraw.SetFillAlpha(0.3);		// Transparencia de los elementos (debug)
				debugDraw.SetLineThickness(1.0);
				debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

				// Pajaro
				tempBird 		= new b2BodyDef;;
				tempBird.type 	= b2Body.b2_dynamicBody;
				tempBird.position.Set(40/30, 60/30);

				var fixture 		= new b2FixtureDef;
				fixture.density 	= 10;
				fixture.friction 	= 0.5;
				fixture.shape 		=  new b2CircleShape(10/30); // Establecemos el radio (1m=30px)

				$bird = $world.CreateBody(tempBird);
				$bird.CreateFixture(fixture);

				$content.addEventListener('click',function(){
					$bird.ApplyImpulse({ x: 8/30, y: -10 }, $bird.GetWorldCenter());
				});

				$world.SetDebugDraw(debugDraw);	// Le proporcionamos al "mundo" la salida del debug
	        }
	    }
         
        window.setInterval(this.updateGravity, 1000 / 60);
	},
	updateGravity: function(){
		$world.Step(
               1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
        );
        $world.DrawDebugData();
        $world.ClearForces();

        if($init && $play){
        	// console.log('Bird', '(' + $bird.GetPosition().x + ',' + $bird.GetPosition().y + ')');
		    $lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);
		    $bPause.brush($lienzo);

		    if($bird != null){
			    var	x = 30 * $bird.GetPosition().x,	// Posición
			    y = 30 * $bird.GetPosition().y,
			    r = 30 * $bird.GetFixtureList().GetShape().GetRadius();	// Radio

			    var RL = 1 // Tamaño extra de la imagen

			    $lienzo.save();		// Guardamos el estado de la transformación de Canvas
			    $lienzo.translate(x,y);	// Nos desplazamos al lugar donde se dibuja
			    $lienzo.drawImage($imgs.get("bird"), 0-r-RL, 0-r-RL, 22, 22);	// Dibujamos la imagen
			    $lienzo.restore();	// Devolvemos el estado de la transformación de Canvas
		    }
        }else{
            if(!$init && !$play){
            	$lienzo.drawImage($imgs.get("bg"), 0, 0, 600, 150);
				$lienzo.drawImage($imgs.get("title"), 100, 15, 100, 40);

				$tap.brush($lienzo);
				$lienzo.drawImage($imgs.get("bird"), 28, 50, 22, 22);
            }else if($init && !$play){
				$game.pauseGame();
			}
        }
	},
	clear: function(){		
		// this.log('Clear Images');
		// $lienzo.clearRect(0, 0, $lienzo.width, $lienzo.height);
	},
	log: function(value){
		console.log(value);
	}
};