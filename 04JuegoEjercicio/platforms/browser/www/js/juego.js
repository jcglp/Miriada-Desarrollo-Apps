var app={
  inicio: function(){
    DIAMETRO_BOLA = 50;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;

    vida = 5;

    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      // Arrancamos el motor de físicas de phaser, ARCADE qeu es el básico
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = "#7B7D7D"
      game.load.image('bola', 'assets/bola.png');


    }

    function create() {

      scoreText = game.add.text(16, 16, (vida + '-'+alto+'-'+ancho), { fontSize:'80px', fill:'#17202A'});

      bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');

      //Indicamos que se aplique la física sobre la bola
      game.physics.arcade.enable(bola);

      //Al cuerpo de la bola le indicamos que gestione las colisiones con el borde de la pantalla
      bola.body.collideWorldBounds = true;
      //Cuando choque genera una señal
      bola.body.onWorldBounds = new Phaser.Signal();
      //a la señal, le añadimos el manejador
      bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);

    }

    function update() {
      var factorDificultad = 300 ;
      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));
/*
      game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola, objetivo2, app.incrementaPuntuacion2, null, this);*/

      if(bola.body.checkWorldBounds()===false){
        game.stage.backgroundColor = "#7B7D7D";
      }else{
        game.stage.backgroundColor='#ff3300';
      }

    }


    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
  },

/*incrementaPuntuacion: function(){
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


  },*/

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
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
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
