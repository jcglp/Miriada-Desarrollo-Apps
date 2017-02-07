var app = {
  model:{
    "notas" : [{"titulo":"Comprar pan", "contenido":"Oferta en la panadería de la esquina"}]
  },

  inicio : function(){
    this.iniciaFastClick();
    this.iniciaBotones();
    this.refrescarLista();

  },

  iniciaFastClick : function(){
    FastClick.attach(document.body);
  },

  iniciaBotones : function(){
    var salvar = document.querySelector('#salvar');
    var anadir = document.querySelector('#anadir');

    anadir.addEventListener('click', this.mostrarEditor, false);
    salvar.addEventListener('click', this.salvarNota, false);
  },

  mostrarEditor : function(){
    alert ('mostrar editar');
    document.getElementById('titulo').value = "";
    document.getElementById('comentario').value = "";
    document.getElementById('note-editor').style.display = "block";
    document.getElementById('titulo').focus();

  },

  salvarNota: function(){

  }
  refrescarLista: function(){

  },

}


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
}
