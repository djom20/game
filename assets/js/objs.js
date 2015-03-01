// Trato de Imagenes
function imagenes () {
    var img = [];

    this.add = function (imagen, directorio) {
    	console.log('Add Image ' + imagen);
        img[imagen] 	= new Image();
        img[imagen].src = directorio;
    }

    this.get = function (imagen) {
    	console.log('Load Image ' + imagen);
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

function tapPlacard(_x, _y, _w, _h, _image){
    var image 	= _image;
    var inicio 	= 1;
    var escalar = 0.03;

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
    var inicio 	= 1;
    var escalar = 0.03;

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