var storeObject = { //ESTA ES LA CLAVE DE TODO MONO!
	id : ''
}	
//----------Formulario y Proyectos---------

	$('#formulario').submit(function() {
	// recolecta los valores que inserto el usuario
	var datosUsuario = $("#nombredeusuario").val();
	var datosPassword = $("#clave").val();


	archivoValidacion = "http://www.organizeme.com.ar/services/validacionReal.php?jsoncallback=?";
	 
	$.getJSON( archivoValidacion, { usuario:datosUsuario ,password:datosPassword}) 
	.done(function(respuestaServer) {

		if(respuestaServer.validacion == "ok"){ 
			$.mobile.changePage("#home"); // Redirige a esa page automaticamente va una vez
			$("#home").on("pageshow", function(){ //al mostrarse esa pagina pasa algo.
				// $("#titulo").append("Bienvenido, "+ respuestaServer[0].idUsuario);
                var elementos = Object.keys(respuestaServer).length;
				for(var i=0; i< elementos-1 ; i++){
                    //CAMBIAR ACA LOS VALORES DE MI CONSULTA
                     $('#proyectos').append(
                    '<li class="proyectos"><a class="atareas" href="' + respuestaServer[i].idProyecto + '">' +
					'<h1>' + respuestaServer[i].nombreProyecto + '</h1>' +
					'</span></a></li>');
				}
			});           
                /* Esto guarda en el localstorage */
                var datosLocales = JSON.stringify(respuestaServer);
                localStorage.setItem("datos", datosLocales);
            
                if(navigator.offline){
                    alert("No hay señal");
                }else{
                  //  alert("Si hay señal");   
                }
            
                /* Esto es para leer y va en otra parte */
                var datosGuardados = localStorage.getItem("datos");
                var datosObjeto = JSON.parse(datosGuardados);
               // alert(datosObjeto[0].tituloES);
            
	}else{
	    alert("no");
	}
	})
	return false;
	})


//-----------------------------------


//----------Tareas---------

$(document).on('pagebeforeshow', '#tarea', function(){      
//	alert(storeObject.id);
var idruta = storeObject.id;

	archivoValidacionEventos = "http://www.organizeme.com.ar/services/eventosruta.php?jsoncallback=?";

	$.getJSON( archivoValidacionEventos, { id:idruta}) 
	.done(function(respuestaServer) {
		if(respuestaServer.validacion == "ok"){
			var elementos = Object.keys(respuestaServer).length;
				for(var i=0; i< elementos-1 ; i++){
                    //CAMBIAR ACA LOS VALORES DE MI CONSULTA
                     $('#tareas').append(
                    '<li class="tareas"><a class="atarea" href="' + respuestaServer[i].idTarea + '">' +
					'<h1>' + respuestaServer[i].nombreTarea + '</h1>' +
					'</span></a></li>');
				}
		}
	});
});


$( "body" ).on( "click", "a.atareas", function( event ) {
  event.preventDefault();
  storeObject.id = $( this ).attr('href');
  $.mobile.changePage("#tarea");
});

//----------------------------

//----------Una tarea---------




$(document).on('pagebeforeshow', '#unatarea', function(){      
//	alert(storeObject.id);
	var idevento = storeObject.id;
	archivoValidacionUnEvento = "http://www.organizeme.com.ar/services/unevento.php?jsoncallback=?";
	//AGREGAR CABECERA RUTA ID cabeceraruta 
	$.getJSON( archivoValidacionUnEvento, { id:idevento})
	.done(function(respuestaServer) {
		if(respuestaServer.validacion == "ok"){
			var elementos = Object.keys(respuestaServer).length;
			for(var i=0; i< elementos-1 ; i++){
                //CAMBIAR ACA LOS VALORES DE MI CONSULTA
                 $('#infotarea').append(
				'<h1>' + respuestaServer[i].nombreTarea + '</h1>' +
				'<p>' + respuestaServer[i].descripcionTarea + '</p>' 
				);
			}
		}
	});
});

$( "body" ).on( "click", "a.atarea", function( event ) {
  event.preventDefault();
  storeObject.id = $( this ).attr('href');
  $.mobile.changePage("#unatarea");
});

//----------------------------

