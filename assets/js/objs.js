// Trato de Imagenes
function image () {
    var img = [];

    this.add = function (imagen, directorio) {
    	// console.log('Add Image ' + imagen);
        img[imagen] 	= new Image();
        img[imagen].src = directorio;
    }

    this.get = function (imagen) {
    	// console.log('Load Image ' + imagen);
        return img[imagen];
    }

    this.isLoaded = function () {
        var carga = true;
        for (var k in img) {
            if (img.hasOwnProperty(k)) {
                carga = (!carga)? false : img[k].complete;
            }
        }

        return carga;
    }
}

function sound () {
    var au = [];
    
    this.add = function (audio, directorio) {
        au[audio] = document.createElement("audio");
        au[audio].src = directorio;
    }
    
    this.play = function (audio) {
        au[audio].play();
    }
    
    this.isLoaded = function () {
        var carga = true;
        for (var k in au) {
            if (img.hasOwnProperty(k)) {
                carga = (!carga)? false : au[k].seekable.end();
            }
        }
        
        return carga;
    }
}

function tapPlacard(_x, _y, _w, _h, _image){
    var image 	= _image;
    var inicio 	= 1;
    var escalar = 0.02;

    this.x 		= _x;
    this.y 		= _y;
    this.width 	= _w;
    this.height = _h;

    this.brush = function (lienzo) {
        lienzo.save();
        lienzo.translate(this.x, this.y);
        lienzo.scale(inicio/3, inicio/3);
        lienzo.drawImage($imgs.get(image), -this.width/2, -this.height/2);
        lienzo.restore();

        inicio += escalar;
        if(inicio > 1 || inicio < 0.5) {
            escalar = -escalar;
        }
    }
}

function button(_x, _y, _w, _h, _image){
    var image 	= _image;

    this.x 		= _x;
    this.y 		= _y;
    this.width 	= _w;
    this.height = _h;

    this.brush = function (lienzo) {
        lienzo.save();
        lienzo.translate(this.x, this.y);
        lienzo.scale(1/4, 1/4);
        lienzo.drawImage($imgs.get(image), this.width, this.height);
        lienzo.restore();
    }
}