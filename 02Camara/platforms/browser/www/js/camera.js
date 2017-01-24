var app = {
  inicio: function() {
    this.iniciaFastClick();
    this.iniciaBotones();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBotones: function() {
    var buttonAction = document.querySelector('#button-action');
    buttonAction.addEventListener('click', function(){
      app.cargarFoto(Camera.PictureSourceType.CAMERA);
    });

    var filterButtons = document.querySelectorAll('.button-filter');
    filterButtons[0].addEventListener('click', function(){ app.aplicarFiltro('gray'); });
    filterButtons[1].addEventListener('click', function(){ app.aplicarFiltro('negative'); });
    filterButtons[2].addEventListener('click', function(){ app.aplicarFiltro('sepia'); });

    var buttonGallery = document.querySelector('#button-gallery');
    buttonGallery.addEventListener('click', function(){
      app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
    });
  },

  cargarFoto:function(PictureSourceType){
    // alert('tomar foto');
    var opciones = {
      quality: 50,
      sourceType: PictureSourceType,
      destinationType: Camera.DestinationType.FILE_URI, //Aqui se puede escoger los datos enbruto en lugar de un FILE_URI
      targetWidth:300,
      targetHeight: 300,
      correctOrientation:true
    };
    navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
  },

  fotoTomada: function(imageURI) {
    var img = document.createElement('img');
    // Call back para esperar a que se cree la imagen antes de
    // pintarla en el canvas
    img.onload = function(){
      app.pintarFoto(img);
    }
    img.src = imageURI;

  },

  pintarFoto: function(img) {
    var canvas = document.querySelector('#foto');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

  },

  errorAlTomarFoto: function(message){
    console.log('Fallo al tomar foto o toma cancelada:'+message);
  },


  aplicarFiltro: function(filterName){
    var canvas = document.querySelector('#foto');
    var context = canvas.getContext('2d');
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    effects[filterName](imageData.data);
    context.putImageData(imageData, 0, 0);

  },


};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
}
