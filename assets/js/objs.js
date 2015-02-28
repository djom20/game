// Trato de Imagenes
function imagenes () {
    var img = [];
    
    this.add = function (imagen, directorio) {
        img[imagen] = new Image();
        img[imagen].src = directorio;
    }
    
    this.get = function (imagen) {
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