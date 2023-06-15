(function () {
    "use strict";


    var regalo = document.getElementById("regalo");

    document.addEventListener("DOMContentLoaded",function () {

        // campos datos usuario
        var nombre = document.getElementById("nombre");
        var apellido = document.getElementById("apellido");
        var email = document.getElementById("email");

        // campos pases
        var pase_dia = document.getElementById("pase_dia");
        var pase_dosdias = document.getElementById("pase_dosdias");
        var pase_completo = document.getElementById("pase_completo");

        //Botones y divs
        var calcular = document.getElementById("calcular");
        var errorDiv = document.getElementById("error");
        var botonRegistro = document.getElementById("btnRegistro");
        var lista_productos = document.getElementById("lista-productos");
        var suma = document.getElementById("suma-total");


        // Extras

        var etiquetaas =  document.getElementById("etiquetas");
        var camisas = document.getElementById("camisa_evento");


        // Habilitando el boton Calcular
        /*El evento addEventListener agrega el tipo de eschucha que tiene el boton
          recibe dos parámetros, el primero es el tipo de evento y el segunto es lo que hará
          o realizará cuando le den click*/
        calcular.addEventListener("click",calcularMontos);

        pase_dia.addEventListener('blur',mostrarDias);
        pase_dosdias.addEventListener('blur',mostrarDias);
        pase_completo.addEventListener('blur',mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validaremail);



        function validaremail() {
            //Si encuentra el arroba
            if(this.value.indexOf("@")> -1){
                errorDiv.style.display="none";
                this.style.border= "1px solid #cccccc";
            }
            //Si no encuentra el arroba
            else{
                errorDiv.innerHTML="Debe tener por lo menos un @";
            }
        }
        function validarCampos() {
            if(this.value==""){
                errorDiv.innerHTML="Este campo es obligatorio";
                errorDiv.style.display=("block");
                // Coloco el imput rojo para que la persona sepa que debe ingresar el nombre
                this.style.border = "1px solid red";
                errorDiv.style.border= "1px solid red";
            }else{
                errorDiv.style.display="none";
                this.style.border= "1px solid #cccccc";
            }
        }

        function calcularMontos(event) {
            event.preventDefault();
            // Checo si el usuario ha seleccionado un regalo, si no ha elegido, no funcionará el boton
            // Regalo valdrá lo uqe este seleccionado en el combobox
            if (regalo.value==='') {
                alert("Debes elegir un regalo");
                regalo.focus();
            }else{
                var boletosDias = parseInt( pase_dia.value,10) || 0 ,
                    boletos2Dias = parseInt(pase_dosdias.value,10) || 0 ,
                    boletosCompleto = parseInt(pase_completo.value,10) || 0,
                    cantCamisetas = parseInt(camisas.value,10) || 0,
                    cantEtiquetas = parseInt(etiquetaas.value,10) || 0;

                    var totalPagar = (boletosDias*30) + (boletos2Dias*45) + (boletosCompleto*50) + ((cantCamisetas*10)*0.93) + (cantEtiquetas*2);

                    var listadoProductos = [];

                    if (boletosDias >=1) {
                        listadoProductos.push(boletosDias+" Pases por día");
                    }
                    if (boletos2Dias>=1) {
                        listadoProductos.push(boletosDias+" Pases por 2 días");
                    }
                    if (boletosCompleto>=1) {
                        listadoProductos.push(boletosCompleto+" Pases completos");
                    }
                    if (cantCamisetas>=1) {
                        listadoProductos.push(cantCamisetas+" Camisas");
                    }
                    if (cantEtiquetas>=1) {
                        listadoProductos.push(cantEtiquetas+" Etiquetas");
                    }
                    lista_productos.style.display="block";
                    lista_productos.innerHTML = "";
                    for (var i = 0; i < listadoProductos.length; i++) {
                        // Hago que se muestres en pantalla cada producto (posisicón i) con un inerHTML
                        lista_productos.innerHTML += listadoProductos[i] + "<br/>";
                    }

                    // Mando al html el total a pagar, mostrandlo en div de suma total
                    suma.innerHTML = "$ "+totalPagar.toFixed(2);

                }



        }

        function mostrarDias() {
            var boletosDias = parseInt(pase_dia.value,10) || 0 ,
            boletos2Dias = parseInt(pase_dosdias.value,10) || 0 ,
            boletosCompleto = parseInt(pase_completo.value,10) || 0;

            var diasElegidos = [];

            if (boletosDias>0) {
                diasElegidos.push("viernes");
                console.log(diasElegidos);
            }else{
                document.getElementById("viernes").style.display="none";
            }

            if (boletos2Dias>0) {
                console.log(diasElegidos);
                diasElegidos.push("viernes", "sabado");
            }else{
                document.getElementById("sabado").style.display="none";
                document.getElementById("viernes").style.display="none";
            }
            if (boletosCompleto>0) {
                console.log(diasElegidos);
                diasElegidos.push("viernes","sabado","domingo");
            }else{
                document.getElementById("domingo").style.display="none";
                document.getElementById("sabado").style.display="none";
                document.getElementById("viernes").style.display="none";
            }
            // Debido a que el formulario tiene los id de viernes sabado y domingo, hago que eztos se muestren en el html
            // utilizando un for que detecte en el arreglo diasElegidos, los días que la persona ha puesto en las campos de dia
            for (var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display="block";
            }
            diasElegidos=[];
        }



    });//DOM content Loaded
})();


$(function () {

    // Programa de comfrencias
    $(".programa-evento .info-curso:first").show();//Muestro la primer opción del menú de eventos
    $(".menu-programa a:first").addClass("activo");
    $(".menu-programa a").on("click",function () {
        $(".menu-programa a").removeClass("activo");
        $(this).addClass("activo");
        $(".ocultar").hide();
        var enlace= $(this).attr("href");
        $(enlace).fadeIn(1000);
        return false;
    });


    var seccionAnterior= $(".article-general #seccion1");
    $(".article-general h3").on("click",function () {

        var seccion_a_mostrar = $(this).attr("href");//Aqui capturo el h3 sobre el cual se mostrará la sección
        $(seccion_a_mostrar).slideToggle();
        if (seccionAnterior==seccion_a_mostrar) {

        } else {
            $(seccionAnterior).hide();
        }
        seccionAnterior=seccion_a_mostrar;

        var boton1= $(this).next().children()[2];
        var boton2= $(this).next().children()[3];

        boton1.style.borderBottom="5px solid black";
        boton2.style.borderBottom="0px solid black";
        $("div.article-contenido div.historia").show();
        $("div.article-contenido div.razones").hide();

        $(boton1).on("click",function () {
          $("div.article-contenido div.razones").hide();
          $("div.article-contenido div.historia").fadeIn(1000);
          boton1.style.borderBottom="5px solid black";
          boton1.style.transition="all 0.6s ease";
          boton2.style.borderBottom="0px solid black";
        });

        $(boton2).on("click",function () {
            $("div.article-contenido div.historia").hide();
            $("div.article-contenido div.razones").fadeIn(1000);
            boton2.style.borderBottom="5px solid black";
            boton2.style.transition="all 0.6s ease";
            boton1.style.borderBottom="0px solid black";
        });


       return false;
    });

});























  //Historia y razones de los articles
    /*
    var enlaceAnterior= $("article .article-contenido a #primero");
    $("article .article-contenido a").on("click",function () {

       var enlace= $(this).attr("href");//Capturo el enlace al que se ha echo clic y muestro su div asociado
       $(enlace).fadeIn(1000);//Con este codigo lo muestro
       $(enlaceAnterior).hide(500);
       if (enlace==enlaceAnterior) {
           $(enlace).hide(500);
           enlaceAnterior= $("article .article-contenido a #primero");
       }else{
           enlaceAnterior=enlace;
       }
       return false;
    });*/
