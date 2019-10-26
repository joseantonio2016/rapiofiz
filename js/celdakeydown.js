
var _fila =0;
var _columna =0;
var headHoja = document.getElementById("headHoja");
var selecto = document.getElementById("selecto");

var esta_rangeando = false;
var esta_nombrando = false;

var fc_1="", fc_2 = "";
var rsel = new Array(4);

headHoja.ondblclick=function(){
  // var cnt = '<ul><li><a href="">Submenu1</a></li><li><a href="">Submenu2</a></li><li><a href="">Submenu3</a></li><li><a href="">Submenu4</a></li></ul>';
  // f0c1.innerHTML=cnt;
  //headHoja.innerHTML=cnt;
  //console.log('hola pe'+  letra[_columna-1]);
  alert('hola pe '+ letra[_columna-1]);
    
}

function celdaFocus(f,c){
  _fila=f;
    _columna=c;
    var celdafc = letra[_columna-1]+_fila;
    if (esta_rangeando){
        fc_2=(fc_1==celdafc)?"":celdafc;
        selecto.value=fc_1+":"+fc_2;
    } else {
        fc_1=celdafc;
        selecto.value=celdafc;

    }
    celdaKeyDown(f,c);
}

function celdaKeyDown(f,c){
   var celda_keydown = document.getElementById("f"+f+"c"+c);
   if (f>maxFila)f=maxFila;
                   celda_keydown.addEventListener('keydown', function (e){
                           if (e.keyCode == 38){
                               if(f>2){
                                   
                                   if (divHoja.scrollTop/(f-1)>24){
                                       let ns = divHoja.scrollTop-2*rem;
                                       divHoja.scrollTop=ns>0?ns:0;
                                   }
                                   document.getElementById("f"+(f-1)+"c"+c).focus();

                               }else{
                                  divHoja.scrollTop=0;
                                   document.getElementById("f1c"+c).focus();
                               }
                               
                       }

                       else if (e.keyCode == 40 ){
                               if(f==1){
                                   document.getElementById("f2c"+c).focus();
                                  divHoja.scrollTop=0;
                               }
                               else if(f<maxFila){
                                document.getElementById("f"+(f+1)+"c"+c).focus();
                               }
                       }
                       else if (e.keyCode == 13){
                           if (f>=maxFila){
                               var nuevaFilaDiv = document.createElement('div');
                           nuevaFilaDiv.className ="grupoDiv";
                           nuevaFilaDiv.setAttribute("id", "gf"+(f+1));
                            var resN = '<span id="f'+(f+1)+'c0" class="numeroFila">'+(f+1)+'</span><span class="grilla">';
           for (var j = 1; j <=maxColumna; j++) {
                       resN+=
            '<input type="text" class="celda" value="" onchange="celdachange('+
            (f+1)+','+j+')" id="f'+(f+1)+'c'+j+'" onfocus="celdaFocus('+(f+1)+','+j+')" '+
            'maxlength="255" onkeydown="celdaKeyDown('+(f+1)+','+j+')">';
                   }
                   resN+='</span>';
                           nuevaFilaDiv.innerHTML=resN;
                       divHoja.appendChild(nuevaFilaDiv);
                       maxFila++;
                       document.getElementById("f"+maxFila+"c"+c).focus();
                           }else{
                               try {
                                   document.getElementById("f"+(f+1)+"c"+c).focus();
                               }catch(e){
                                   console.log("Aprietas muy rapido, despacio");
                               }
                           }
               }
                           
                       },false);

   
 }

//  selecto.addEventListener("keypress", function(e){ 
//     if (e.keyCode == 58){
//         if(esta_rangeando){
//             e.preventDefault();
//         }else esta_rangeando = true;  
//     }else if (e.keyCode == 59 || e.keyCode == 61){
//         esta_nombrando = true;
//     }
//     var sval = selecto.value;
//      console.log("aqui pe "+sval.substring(-1));
//      var exp = /([a-zA-Z]|[aA][a-yA-Y])[1-9]{1,3}/;
//      fc_1=(exp.test(sval))?sval:"";
//  });
 selecto.addEventListener("keyup", function(e){
     var sval=selecto.value;
    buscarRango(sval);
    // if (e.keyCode==58){
    //     if(esta_rangeando)e.preventDefault();
    // }
    // if (e.keyCode == 59 || e.keyCode == 61){
    //     if(esta_nombrando)e.preventDefault();
    //  }
});

function buscarRango(_sval){
    var pt1 = /^([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}$/;
    var ptr = /^([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}:$/;
    var pt2 = /^([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}:([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}$/;
    var ptn = /^([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}:([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}=$/;
    var pt3 = /^([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}:([a-zA-Z]|[aA][a-yA-Y])[1-9][0-9]{0,2}=[a-z]{1,13}$/;
    if (pt1.test(_sval)){
        var stf = _sval.split(/\D/);
        var stc = _sval.split(/\d/);
        var col = letra.indexOf(stc[0].toUpperCase());
        if(maxColumna>col && maxFila>=stf[1]){
            fc_1=""+stc[0].toUpperCase()+stf[1];
        }
        esta_rangeando=false;
        esta_nombrando=false; 
    }
    else if (ptr.test(_sval)){
        var stf = _sval.split(/\D/);
        var stc = _sval.split(/\d|:/);
        var f_stf = stf.filter(w=>w.length > 0);
        var col = letra.indexOf(stc[0].toUpperCase());
        if(maxColumna>col && maxFila>=f_stf[0]){
            fc_1=_sval.substring(0,_sval.length-1);
            esta_rangeando=true;
            esta_nombrando=false; 
        }
        
    }
    else if (pt2.test(_sval)){
        var stf = _sval.split(/\D/);
        var stc = _sval.split(/\d|:/);
        var f_stf = stf.filter(w=>w.length > 0);
        var f_stc = stc.filter(w=>w.length > 0);
        var colA = letra.indexOf(f_stc[0].toUpperCase());
        var colB = letra.indexOf(f_stc[1].toUpperCase());
        var colMax = Math.max(colA,colB); 
        var filMax = Math.max(f_stf[0],f_stf[1]); 
        if(maxColumna>colMax && maxFila>=filMax){
            var colMin = Math.min(colA,colB);
            var filMin = Math.min(f_stf[0],f_stf[1]);
            fc_1=""+f_stc[0]+f_stf[0];
            fc_2=""+f_stc[1]+f_stf[1];
            esta_rangeando=true;
            esta_nombrando=false;
            for (let i = rsel[0]; i <= rsel[2]; i++) {
                for (let j = (rsel[1]+1); j <= (rsel[3]+1); j++) {
                    var rangCell = document.getElementById("f"+i+"c"+j);
                    console.log("data-bcolor "+rangCell.getAttribute("data-bcolor"));
//                     if (rangCell.hasAttribute("data-bcolor")){
// }else 
                    rangCell.style.background="#fff";
                }   
            }
            for (let i = filMin; i <= filMax; i++) {
                for (let j = (colMin+1); j <= (colMax+1); j++) {
                    var rangCell = document.getElementById("f"+i+"c"+j);
                    rangCell.style.background="#EDF6F7";
                }
                
            }
            rsel=[filMin,colMin,filMax,colMax];
        }else console.log("Error asignando rango");
    }
    else if(ptn.test(_sval)){
        var stf = _sval.split(/\D/);
        var stc = _sval.split(/\d|:|=/);
        var f_stf = stf.filter(w=>w.length > 0);
        var f_stc = stc.filter(w=>w.length > 0);
        var col = Math.max(letra.indexOf(f_stc[0].toUpperCase()),
        letra.indexOf(f_stc[1].toUpperCase()));
        var fil = Math.max(f_stf[0],f_stf[1]);
        if(maxColumna>col && maxFila>=fil){
            fc_1=""+f_stc[0]+f_stf[0];
            fc_2=""+f_stc[1]+f_stf[1];
            esta_rangeando=true;
            esta_nombrando=false;
            console.log("nombrando "+fc_1+" : "+fc_2);
        }
    }
    else if(_sval.trim()==""){
        console.log("Limpio");
        esta_rangeando=false;
            esta_nombrando=false; 
    }
}

function rangoSelecto(){

}



 //onkeydown="celdaKeyDown(0,'+(m+1)+')"
 //onkeydown="celdaKeyDown('+i+','+j+')"