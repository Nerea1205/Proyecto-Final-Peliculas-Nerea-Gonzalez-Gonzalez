//Buscamos el campo donde se busca por título
const campoTitulo = document.getElementById("txtTitulo");

//Buscamos el campo donde se introduce el año
const campoAnio = document.getElementById("txtAnio");

//Buscamos el botón de inicio de busqueda
const botonBuscar = document.getElementById("btBuscar");

//Buscamos el espacio donde saldrán los resultados
const resultados = document.getElementById("resultados");

//Buscamos el espacio donde mostramos los detalles de la película
const detallePelicula = document.getElementById("detallePelicula");

//Buscamos el espacio donde mostraremos la valoracion media de la película
const valoracionMedia = document.getElementById("valoracionMedia");

//Indicamos lo que debe ocurrir cuando el usuario accione buscar
botonBuscar.addEventListener("click", async function(){
    //Cogemos el título introducido por el usuario y quitamos los espacios
    const titulo = campoTitulo.value.trim();
    //Cogemos el año introducido por el usuario
    const anio = campoAnio.value.trim();
    //Comprobamos que el usuario a escrito un título
    if (titulo === ""){
        resultados.textContent = "Escribe el título de la película";
        return;
    }
    //Mostramos un mensaje temporal mientras se produce la busqueda
    resultados.textContent = "Buscando peliculas...";
    //Cremos la direccion para buscar la pelicula
    let direccion = "/buscar?titulo=" + encodeURIComponent(titulo);
    //Si el usuario ha introducido el año, lo añadimos a la direccion
    if(anio !== ""){
        direccion = direccion + "&anio=" + encodeURIComponent(anio);
    }
   try{
        //Solicitamos los resultados al servidor
        const respuesta = await fetch(direccion);
        //Convertimos la respuesta en datos de JavaScript
        const datos = await respuesta.json();
        //comprobamos si se han encontrado peliculas
        if (datos.error){
            resultados.textContent = datos.error;
            return;
        }
        if(datos.Search){
            //Limpiamos los resultados anteriores
            resultados.textContent = "";
            //Recorremos las peliculas encontradas
            datos.Search.forEach(function(pelicula){
                //Creamos un espacio para mostrar cada pelicula
                const elemento = document.createElement("div");
                elemento.className = "col-6 col-md-4 col-lg-3 mb-3";
                //Indicamos que se puede pulsar sobre la película
                elemento.style.cursor = "pointer";
                //Creamos la tarjeta(espacio) de la pelicula
                const tarjeta = document.createElement("div");
                tarjeta.className = "card h-100 p-2";
                //Comprobamos si la pelicula tiene cartel 
                if(pelicula.Poster && pelicula.Poster !== "N/A"){
                    //Creamos la imagen del cartel 
                    const cartel = document.createElement("img");
                    cartel.src = pelicula.Poster;
                    cartel.alt = "Cartel de "+ pelicula.Title;
                    cartel.className = "cartel-pelicula";
                    //Añadimos el cartel a la tarjeta
                    tarjeta.appendChild(cartel);
                }else{
                    //Mostramos un mensaje si no hay cartel disponible
                    const sinCartel = document.createElement("div");
                    sinCartel.textContent = "Cartel no disponible";
                    sinCartel.className = "text-center py-5";
                    tarjeta.appendChild(sinCartel);
                }
                // Creamos el titulo de la pelicula
                const tituloPelicula = document.createElement("h5");
                tituloPelicula.textContent = pelicula.Title;
                tituloPelicula.className = "mt-2";
                // Añadimos el titulo a la tarjeta
                tarjeta.appendChild(tituloPelicula);

                // Creamos el año de la pelicula
                const anioPelicula = document.createElement("p");
                anioPelicula.textContent = pelicula.Year;
                // Añadimos el año a la tarjeta
                tarjeta.appendChild(anioPelicula);
                // Añadimos la tarjeta al espacio de la pelicula
                elemento.appendChild(tarjeta);

                //Indicamos lo que debe ocurrir al seleccionar la pelicula
                elemento.addEventListener("click",async function(){
                    //Guardamos el identificador de la pelicula seleccionada
                    idPeliculaSeleccionada = pelicula.imdbID;
                    const direccionDetalle = "/detalle?id_pelicula=" + encodeURIComponent(pelicula.imdbID);
                    try{
                        //Solicitamos los detalles al servidor
                        const respuestaDetalle = await fetch(direccionDetalle);
                        //Convertirmos la respuesta a datos JavaScript
                        const datosDetalle = await respuestaDetalle.json();
                        //Limpiamos los detalles anteriores
                        detallePelicula.textContent = "";
                        //Comprobamos si se ha producido un error
                        if(datosDetalle.error){
                            detallePelicula.textContent = datosDetalle.error;
                        }else if(datosDetalle.mensaje){
                        //Comprobamos si se han recibido detalles
                            detallePelicula.textContent = datosDetalle.mensaje;
                        }else{
                            //Mostramos el título
                            const titulo = document.createElement("h2");
                            titulo.textContent = datosDetalle.Title;
                            detallePelicula.appendChild(titulo);
                            //Mostramos el año
                            const anio = document.createElement("p");
                            anio.textContent = "Año:" + datosDetalle.Year;
                            detallePelicula.appendChild(anio);
                            //Mostramos el director
                            const director = document.createElement("p");
                            director.textContent = "Director: " + datosDetalle.Director;
                            detallePelicula.appendChild(director);
                            //Mostramos la sipnosis
                            const sinopsis = document.createElement("p");
                            sinopsis.textContent = "Sinopsis: " + datosDetalle.Plot;
                            detallePelicula.appendChild(sinopsis);
                            //Mostramos el género
                            const genero = document.createElement("p");
                            genero.textContent = "Genero:" + datosDetalle.Genre;
                            detallePelicula.appendChild(genero);
                            //Mostramos los comentarios de la pelicula seleccionada
                            await mostrarComentarios(pelicula.imdbID);
                            //Mostramos la valoracion de la pelicula selecciona
                            await mostrarValoracionMedia(pelicula.imdbID);
                        }
                    }catch(error){
                        //Mostramos un mensaje si ocurre error
                        document.getElementById("detallePelicula").textContent =
                        "No se han podido obtener los detalles de la película";
                        console.log(error);
                    }
                });
                //Añadimos la película a la lista de resultados
                resultados.appendChild(elemento);
            });
        } else {
            //Mostramos el mensaje si no se han encontrado peliculas
            resultados.textContent =
                datos.mensaje || "No se han encontrado películas";
        }
   } catch(error){
    //Mostramos un mensaje si ocurre un error en la busqueda
    resultados.textContent =
        "No se ha podido realizar la búsqueda";
    console.log(error)
   }
});
//Creamos una nueva fúncion para mostrar los comentarios de una pelicula
async function mostrarComentarios(id_pelicula) {
    //Buscamos el espacio donde se muestran los comentarios
    const listaComentarios = document.getElementById("listaComentarios");
    //Creamos la direccion para obtener los comentarios
    const direccionComentarios = "/comentarios?id_pelicula="+ encodeURIComponent(id_pelicula);
    console.log("Direccion de los comentarios:",direccionComentarios)
    try{
        //Solicitamos los comentarios al servidor
        const respuestaComentarios = await fetch(direccionComentarios);
        //Convertimos la respuesta a datos de JavaScript
        const datosComentarios = await respuestaComentarios.json();
        //Limpiamos los comentarios anteriores
        listaComentarios.textContent = "";
        //Comprobamos si hay comentarios
        if(datosComentarios.comentarios.length === 0){
            listaComentarios.textContent = "Esta película todavía no tiene comentarios";
        }else{
            //Recorremos los comentarios encontrados
            datosComentarios.comentarios.forEach(function(comentario) {
                //Creamos un espacio para cada comentario
                const elemento = document.createElement("p");
                //Obtenemos la valoración del comentario
                const valoracion = comentario[5];
                //Convertimos la valoraacion a número si existe
                const valoracionNumero = valoracion === null || valoracion === "" 
                    ? null
                    : Number(valoracion); 
                //Comprobamos si el comentario tiene una valoracion
                if (valoracionNumero === null){
                    //Mostramos el nombre y el comentario
                    elemento.textContent = comentario[2] + ": " + comentario[3];
                }else{
                    //Creamos las estrellas que representan la valoración
                    const estrellasLlenas = "★".repeat(valoracionNumero);
                    //Calculamos cuantas estrellas faltan para completar las cinco
                    const estrellasVacias = "☆".repeat(5 - valoracionNumero);
                    //Unimos las estrellas llenas y vacías en un unico texto
                    const estrellas = estrellasLlenas + estrellasVacias;
                    //Mostramos el nombre,el comentario y las estrellas
                    elemento.textContent = comentario[2] + ": " + comentario[3] + " — " + estrellas;
                }    
                //Añadimos el comentario a la página
                listaComentarios.appendChild(elemento);
            });
        }
    } catch (error){
        //Mostramos un mensaje si ocurre un error
        listaComentarios.textContent = "No se han podido cargar los comentarios";
        console.log(error);
    }
}
//Creamos una funcion para mostrar la valoracion media de una pelicula
async function mostrarValoracionMedia(id_pelicula){
    //Creamos la direccion para consultar la valoracion media
    const direccionMedia ="/valoracion-media?id_pelicula=" + encodeURIComponent(id_pelicula);
    try{
    //Solicitamos la valoracion media al servidor
        const respuestaMedia = await fetch(direccionMedia);
        if(!respuestaMedia.ok){
            throw new Error("Error al obtener valoracion media");
        }
        //Convertimos la respuesta a datos JavaScript
        const datosMedia = await respuestaMedia.json();
        //Comprobamos si la película tiene valoraciones
        if(datosMedia.media === null){
            //Mostramos un mensaje si no hay valoraciones
            valoracionMedia.textContent = "Esta película todavía no tiene valoraciones";
        }else{
            //Redondeamos la media a un decimal
            const mediaRedondeada = Number(datosMedia.media).toFixed(1);
            //Calculamos las estrellas llenas
            const estrellasLlenas = "★".repeat(Math.round(datosMedia.media));
            //Calculamos estrellas vacias
            const estrellasVacias = "☆".repeat(5 - Math.round(datosMedia.media));
            //Unimos las estrellas llenas y vacias
            const estrellas = estrellasLlenas + estrellasVacias;
            //Mostramos las estrellas y la media númerica
            valoracionMedia.textContent = 
            "Valoracion media:" + estrellas + "(" + mediaRedondeada + "/5)";
        }        
    }catch(error){
        //Mostramos un mensaje si ocurre un error 
        valoracionMedia.textContent = "No se ha podido cargar la valoracion media";
        console.log(error);
    }
}
    
//Buscamos el botón para guardar comentarios
const botonGuardarComentario = document.getElementById("btGuardarComentario");
//Buscamos el campo donde se escribe el nombre
const campoNombre = document.getElementById("txtNombre");
//Buscamos el campo donde se escribe el comentarios
const campoComentario = document.getElementById("txtComentario");
//Buscamos el campo donde se selecciona la valoración
const campoValoracionActual = document.getElementById("txtValoracion");
//Buscamos el espacio donde mostraremos los mensajes
const mensajeComentario = document.getElementById("mensajeComentario");
//Buscamos el boton para mostrar el formulario
const botonMostrarFormulario = document.getElementById("btMostrarFormulario");
//Buscamos el formulario de comentarios
const formularioComentario = document.getElementById("formularioComentario");

//Indicamos lo que debe ocurrir al pulsar el botón
botonMostrarFormulario.addEventListener("click",function(){
    //Mostramos el formulario quitando la clase que lo oculata
    formularioComentario.classList.remove("d-none");
});
//Guardamos el id de la pelicula seleccionada
let idPeliculaSeleccionada = "";
//Esperamos a que el usuario pulse el boton de guardar
botonGuardarComentario.addEventListener("click",async function() {
    //Obtenemos el nombre escrito
    const nombre = campoNombre.value.trim();
    //Obtenemos el comentario escrito
    const comentario = campoComentario.value.trim();
    //Obtenemos la valoración seleccionada
    const valoracion = campoValoracionActual.value;
    //Comprobamos que los campos no esten vacíos
    if (nombre === ""|| comentario === ""|| valoracion === ""){
        mensajeComentario.textContent = "Escribe tu nombre, tu comentario y selecciona una valoración";
        return;
    }
    //Comprobamos qque haya una película seleccionada
    if (idPeliculaSeleccionada === ""){
        mensajeComentario.textContent = "Selecciona primero una película";
        return;
    }
    try{
        //Enviamos el comentario al servidor
        const respuesta = await fetch("/comentarios",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id_pelicula: idPeliculaSeleccionada,
                persona: nombre,
                comentario: comentario,
                valoracion: valoracion
            })
        });
        //Comprobamos si el servidor ha devuelto un error HTTP
        if(!respuesta.ok){
            mensajeComentario.textContent = "No se ha podido guardar el comentario";
            return;
        }
        //Convertimos la respuesta del servidor a JavaScript
        const datos = await respuesta.json();
        //Mostramos el mensaje que devuelve el servidor
        mensajeComentario.textContent = datos.mensaje;
        //Limpiamos los campos del formulario 
        campoNombre.value = "";
        campoComentario.value ="";
        campoValoracionActual.value ="";
        //Volvemos a cargar los comentarios de la película 
        await mostrarComentarios(idPeliculaSeleccionada);
        //Volvemos a cargar la valoración media de la película
        await mostrarValoracionMedia(idPeliculaSeleccionada);
    }catch(error) {
        //Mostramos un mensaje si ocurre un error
        mensajeComentario.textContent = "No se ha podido guardar el comentario";
        console.log(error)
    }
});