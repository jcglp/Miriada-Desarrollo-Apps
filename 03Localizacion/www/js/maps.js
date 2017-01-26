var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function() {
    //alert('dispositivoListo');
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNnbHAiLCJhIjoiY2l5ZWJjcGY4MDB1ZzJ3bXhuNDY0YW53ZiJ9.p15BVvVgBaY4KPr1JimODw', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

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
