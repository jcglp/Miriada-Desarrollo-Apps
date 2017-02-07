var app={
  inicio: function(){
    DIAMETRO_BOLA = 50;
    dificultad = 0;
    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;

    colores = ["#7E5109", "#9C640C", "#D68910", "#D68910", "#F39C12"
              ,"#F5B041", "#F8C471", "#FAD7A0", "#FDEBD0", "#FEF5E7"]

    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      // Arrancamos el motor de físicas de phaser, ARCADE qeu es el básico
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = colores[dificultad];
      game.load.image('bola', 'assets/bola.png');
      game.load.image('objetivo', 'assets/objetivo.png');
      game.load.image('objetivo2', 'assets/objetivo2.png');

    }

    function create() {

      scoreText = game.add.text(16, 16, (puntuacion + ' [' + dificultad +']'), { fontSize:'100px', fill:'#757676'});
      // Convertimos las imagenes en sprites
      objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');
      objetivo2 = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo2');
      bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');

      //Indicamos que se aplique la física sobre la bola
      game.physics.arcade.enable(bola);
      game.physics.arcade.enable(objetivo);
      game.physics.arcade.enable(objetivo2);
      //Al cuerpo de la bola le indicamos que gestione las colisiones con el borde de la pantalla
      bola.body.collideWorldBounds = true;
      //Cuando choque genera una señal
      bola.body.onWorldBounds = new Phaser.Signal();
      //a la seña, le añadimos el manejador
      bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);

    }

    function update() {
      var factorDificultad = (300 + (dificultad * 100));
      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));

      game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola, objetivo2, app.incrementaPuntuacion2, null, this);

      if(bola.body.checkWorldBounds()===false){
        game.stage.backgroundColor = colores[dificultad]; //'#f27d0c';
      }else{
        game.stage.backgroundColor='#ff3300';
      }

    }


    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
  },

  incrementaPuntuacion: function(){
    puntuacion = puntuacion+1;
    scoreText.text = puntuacion + ' [' + dificultad +']';

    objetivo.body.x = app.inicioX();
    objetivo.body.y = app.inicioY();

    if ( (puntuacion > 0) && (dificultad <9) ){
      dificultad = dificultad + 1;

    }

  },

  incrementaPuntuacion2: function(){
    puntuacion = puntuacion+10;
    scoreText.text = puntuacion + ' [' + dificultad +']';

    objetivo2.body.x = app.inicioX();
    objetivo2.body.y = app.inicioY();

    if ( (puntuacion > 0) && (dificultad <9) ){
      dificultad = dificultad + 1;
    }

  },

  decrementaPuntuacion: function(){
    puntuacion = puntuacion-1;
    scoreText.text = puntuacion + ' [' + dificultad +']';

    if (puntuacion < 0){
      dificultad = 0;
    }


  },

  inicioX: function(){
    return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
  },

  inicioY: function(){
    return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){

    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(app.recomienza, 1000);
    }
  },
  recomienza: function(){
    document.location.reload(true);
  },
  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    velocidadY = datosAceleracion.y ;

  },


};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}
