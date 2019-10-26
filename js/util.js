
		var d = new Date();
		function f(value){
			return (value < 10) ? '0' + value : value;
		}
		var name = "".concat(d.getFullYear(),f(d.getMonth()+1),f(d.getDate()),":",f(d.getHours()),f(d.getMinutes()),f(d.getSeconds()));
				alert(name);
				document.getElementById("namedoc").placeholder = name;