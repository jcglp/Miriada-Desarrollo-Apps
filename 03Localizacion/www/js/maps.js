var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function() {
    //alert('dispositivoListo');
    navigator.geolocation.getCurrentPosition(app.dibujaCoordenadas, app.errorAlSolicitarLocalizacion);
  },

  dibujaCoordenadas: function(position){
    //alert('dibujaCoordenadas');
    var coordsDiv = document.querySelector('#coords');
    coordsDiv.innerHTML = 'Latitud: ' + position.coords.latitude
                        + '<br>Longitud: ' + position.coords.longitude;

  },

  errorAlSolicitarLocalizacion:function(error){
    //alert('errorAlSolicitarLocalizacion');
    console.log(error.code + ': ' + error.message);
  },

};

if ('addEventListener' in document) {
  /* Cuando la pagina esta lista y cargada */
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  /* Cuando el dispostivio esta listo para accder a sus recrusos */
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);

}
