//const socket =io();
const headgf0 = document.getElementById("gf0");
var contenidoCelda='';
var nombreHoja='';
var hojaScrollX=0;
var hojaScrollY=0;


divHoja.onscroll= function(){
         hojaScrollY=divHoja.scrollTop-2;
         hojaScrollX=divHoja.scrollLeft;
         headgf0.style.top=hojaScrollY+'px';
          var x = divHoja.getElementsByClassName("numeroFila");
         for (var i = 0; i < x.length; i++) {
             x[i].style.left = hojaScrollX+'px';
         }
}



function namechange(){
      console.log('nuevo nombre: '+ namedoc.value);
}

function celdachange(f,c){
  var pad = document.getElementById('f'+f+'c'+c);
    console.log('enviando desde f'+ f+' c'+c+' val:'+pad.value);
}
// function namefocus(){
//   contenidoNombre=namedoc.getAttribute('value')
// }

