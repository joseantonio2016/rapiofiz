const divHoja = document.getElementById("hoja");
var namedoc = document.getElementById("namedoc");
			const rem = 16;
		const sizeAlturaCeldaEm = 2;
		const altoNoHojaEm = 6.5;
		const defaultSizeCeldaEm = 8;
		const letra = ['A','B','C','D','E','F','G','H','I','J','K',
				'L','M','N','O','P','Q','R','S','T','U','V','W','X',
				'Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI',
				'AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT',
				'AU','AV','AW','AY'];
		//
		// const defaultSizeCeldaEm = 8;
		// const sizeMinimalCeldaEm = 2;
		// const sizeRegula2CeldaEm = 4;
		// const sizeMaximoCeldaEm = 16;
		//
		var ancho = (window.innerWidth)/rem;
		var alto = (window.innerHeight)/rem;	
		var sumaAncho = 0;
		var sumaAlto = 0;

		var contenidoNombre='';
			

		//cuando es documento nuevo tomar 8 rem x 16 = 128px por celda
		//cuando es documento nuevo tomar 28px por altura celda 
		//	487778759442122530
		var maxColumna = Math.floor(ancho/defaultSizeCeldaEm);
		var maxFila = Math.floor((alto-altoNoHojaEm)/sizeAlturaCeldaEm);		
		var res = '<div class="grupoDiv" id="gf0"><span id="f0c0" class="numeroFila"></span>'+
		'<span class="grilla" id="headHoja">';
			for (var m = 0; m<maxColumna;m++){
				res+='<input type="text" readonly="true" id="f0c'+(m+1)+'" onfocus="celdaFocus(0,'+(m+1)+')" value="'+
				letra[m]+'" class="celda cabecera">';
			}
			res+='</<span></div>';
				for (var i = 1; i <= maxFila; i++) {
					res += '<div class="grupoDiv" id="gf'+i+
					'"><span id="f'+i+'c0" class="numeroFila">'+i+'</span>'+
					'<span class="grilla">';
					for (var j = 1; j <=maxColumna; j++) {
						res+=
		'<input type="text" class="celda" id="f'+i+'c'+j+'" value="" maxlength="255" onkeydown="celdaKeyDown('+i+','+j+')" onchange="celdachange('+i+','+j+')" onfocus="celdaFocus('+i+','+j+')">';
					}
					res+='</span></div>';
				}
				
		divHoja.innerHTML=res;
		function displayWindowSize(){
                var w = document.documentElement.clientWidth;
                var h = document.documentElement.clientHeight;
                sumaAncho = maxColumna*rem*defaultSizeCeldaEm*1.2;
                var anchoN = Math.ceil(sumaAncho*100/w)+'%';
                for (var i = 0; i <= maxFila; i++) {
                    document.getElementById('gf'+i)
                    .style.width = anchoN;
                }
                divHoja.style.height = (h-(altoNoHojaEm*rem))+'px';

            }

            window.addEventListener("resize", displayWindowSize);
            displayWindowSize();

		