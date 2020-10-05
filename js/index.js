$(document).ready(function() {

    //variables   ----------------
    var tabActive = null;
    var contBtnE = 0;
    
    //acciones por defecto   ------------------
    $(".notificacion.emergencia").find("#notificacion__importancia").html("! Importante");
    $(".notificacion.alerta").find("#notificacion__importancia").html("Alerta");
    
    //eventos   -------------------------
    //estilo al boton submenu
    $(".subMenu a").click(function(){
         $(this).parent().toggleClass("active");
    });
    
    //navegacion en el submenu
    $("#subMenu__estado").click(function(){
        tabActive = $("#tab1");
        mpActivateTabs("Estado", tabActive);
    });
    $("#subMenu__notificaciones").click(function(){
         tabActive = $("#tab2");
         mpActivateTabs("Notificaciones",tabActive);
    })
    $("#subMenu__alarma").click(function(){
         tabActive = $("#tab3");
         mpActivateTabs("Alarma", tabActive);
    });
    $("#subMenu__amigos").click(function(){
         tabActive = $("#tab4");
         mpActivateTabs("Amigos", tabActive);
    });
    
    //icono retrocedr
    $("#icon-retroceder").click(function(){
        $("#tabs_content").toggleClass("active");
        $("#main-page").toggleClass("inactive");
        tabActive.toggleClass("active");
        $(".i-sms").remove();
    });
    
    //navegacion menu amigos
    $("#ca-menu li").click(function() {
		$("#ca-menu li").removeClass("active");
		$(this).addClass("active");
		$(".cm-amigos").hide();
		var activeCaTab = $(this).data("content");
		$(activeCaTab).show();
	});
    
    //activar boton emergencia
    $("#btn-emergency").click(function() {
        if(contBtnE == 0){
            $(this).attr("value","Parar");
            contBtnE = 1;
        }else{
            $(this).attr("value","Ayuda");
            contBtnE = 0;
        }
		$("#tab3").toggleClass("alertar");
	});
    
    
    //confirmar, eliminar, enviar invitacion de amistad
    $(".activar-sms").click(function(){
        tab6Message($(this));
    });
    
    
    //llamadas a funciones  ----------------
    test();
    
    //animaciones  -------------------
    
    //animacion de la cuadricula
    $(".tab1__content-caras").click(function() {
		$("img.tab1__caras").removeClass("active");
        $("div.tab1__descripcion").removeClass("active");
		$(this).find("img").addClass("active");
        $(this).find("div").addClass("active");
	});
    //mostrar test
    $("#most-test").click(function() {
		$("#perfil").toggleClass("inactive");
        $("#top").toggleClass("active");
        $("#cont-test").toggleClass("active");
	});
    //ocultar test
    $("#ir-perfil").click(function() {
		$("#perfil").toggleClass("inactive");
        $("#top").toggleClass("active");
        $("#cont-test").fadeOut(200,"linear",function(){
            $(this).toggleClass("active");
            $(this).css("display","flex");
        });
	});
    
    //funciones   -------------------------
    
    //calcular el grado de rotacion y mensaje segun el porcentaje
    function test(){
        test = $("#test");
        NMensaje = $("#testSms");
        testFondo = test.find("span");
        porcentaje = test.data("porcentaje");
        grados = porcentaje*180/100;
        mensaje = "";
        if(porcentaje < 21){
            mensaje = "Todo bien";
        }else if (porcentaje > 20 && porcentaje < 51){
            mensaje = "Cuidado pide ayuda";
        }else{
            mensaje = "Alerta estas en peligro";
        }
        test.find(".test__porcentaje").text(porcentaje+"%");
        test.css("transform","rotate("+grados+"deg)");
        testFondo.css("transform", "scale(1.02) rotate(-"+grados+"deg)");
        NMensaje.text(mensaje);
    }
    
    //activar pestaña de sumbenu principal
    function mpActivateTabs(titulo, tab){
        $("#tc-titulo").text(titulo);
        tab.toggleClass("active");
        $("#main-page").toggleClass("inactive");
        $("#tabs_content").toggleClass("active");
    }
    
    //pestaña 6 mensaje confirmar, eliminar, invitar
    function tab6Message(button){
        var cadena = "";
        var invitacion = button.parent().parent().parent();
        var valor = button.data("sms");
        if(valor == "confirmar"){
            invitacion.css("display","none");
            cadena = "Se agrego a tus amigos";
        }else if(valor == "eliminar"){
            invitacion.css("display","none");
            cadena = "Solicitud eliminada";
        }else if(button.hasClass("icon-mas")){
            button.removeClass("icon-mas");
            button.addClass("icon-check");
            button.css("color","#94BCBB");
            cadena = "Invitacion enviada";
        }
        if(cadena !== ""){
            var div = '<div class="i-sms active">'+cadena+'</div>';
            $("#tab4").append(div);
        }
        
    }
});