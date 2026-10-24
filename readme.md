Buscador de peliculas y comentarios

1. Descripción del proyecto

Esta aplicación nos permite obtener información basica sobre la pelicula buscada, proporcionando la fecha de estreno, el director,una breve sipnosis y la valoracion media de la pelicula, a partir del titulo de la pelicula y del año (opcional), también permite reseñar la pelicula seleccionada añadiendo comentarios y una valoracion que afectara a la valoración general de la película.

2. Funcionalidades

La aplicación permite realizar las siguientes acciones:

Buscar películas por su título y, opcionalmente, por su año de estreno.
Mostrar los carteles de las películas encontradas.
Consultar los detalles de una película seleccionada.
Ver los comentarios publicados sobre cada película.
Añadir comentarios y valoraciones de entre una y cinco estrellas.
Calcular y mostrar la valoración media de una película.
Mostrar mensajes cuando no se encuentran películas o cuando se produce algún error.

3. Tecnologías utilizadas 

Para la realizacion del proyecto se ha utilizado:
Python utilizado principalemente en la parte principal de la aplicación.
Fastapi utilizado para gestionar las rutas y peticiones de la aplicacion.
JavaScript utilizado para realizar las busquedas y actualizar el contenido de la página.
HTML utilizado para definir toda la estructura de la página.
CSS y Bootstrap utilizado para los estilos y la presentacion de la página.
SQLite creamos una base de datos para guardar los comentarios y las valoraciones.
OMDb API que es el repositorio que nos proporciona la informacion sobre las peliculas. 

4. Estructura del proyecto

La aplicación esta divida principalmente en main.py, inicio.html conexion.py, consultas.py, omdb.py, estilos.css y app.js. Cada una de estos archivos realiza una funcion especifica dentro de la aplicacion

Inicio.html se encarga de mostrar los campos, los botones y espacios en los que se presenta el contenido
App.js reacciona a eventos, consulta las rutas del servidor y actualiza la página.
Main.py define las rutas HTTP de las aplicación FastApi
OMDB.py consulta el servcio externo de OMDb, que nos devuelve los datos de la pelicula o una respuesta de error o sin resultado.
Consultas.py se encarga de agrupar las operaciones SQL sobre los comentarios y valoraciones.
Conexion.py proporciona cusor, lectura de resultados y cierre de conexion.
La carpeta database con el archivoo peliculas.db, guarda los registros de comentarios y las valoraciones.
En la carpeta static css y bootstraap, controlan la presentacion visual de la aplicación(colores, tamaño de los espacios y distribucion)
requirements.txt y .env describen depencias y la configuracion privada, permiten preparar el entorno y leer la clave de OMDb sin colocarla en código. 
 
5. Requisitos previos

Para ejecutar la aplicación se necesita:
Tener Python instalado.
Disponer de conexión a Internet para realizar consultas a OMDb.
Tener una clave de API de OMDb.
Instalar las dependencias indicadas en el archivo requirements.txt.
Disponer del archivo de base de datos database/peliculas.db en la ubicación correspondiente.

6. Instalación y ejecución

1.Abrir el proyecto
Abrir una terminal en la carpeta principal del proyecto, donde se encuentran main.py y requirements.txt.
2.Crear el entorno virtual
Comando: python -m venv entorno
3.Activar el entorno virtual
.\entorno\Scripts\Activate
4.Instalar las dependencias
Con el entorno activado ejecutar el comando: pip install -r requirements.txt
5.Configurar OMDb
Crear un archivo llamado .env en la carpeta principal del proyecto y añadir la clave de la API de OMDb mediante la variable OMDB_API_KEY.
El archivo servicios/omdb.py utiliza la función load_dotenv() para cargar la configuración y os.getenv("OMDB_API_KEY") para obtener la clave.

La clave debe mantenerse privada
6.Iniciar la aplicación
Ejecutar el comando: uvicorn main:app --reload
Cuando el servidor esté funcionando, abrir en el navegador la siguiente dirección:
http://127.0.0.1:8000/

7. Base de datos y configuración

La aplicación utiliza SQLite para almacenar los comentarios y las valoraciones de las películas.
La base de datos se encuentra en database/peliculas.db. Las consultas que permiten guardar y recuperar estos datos están organizadas en consultas.py, mientras que conexion.py se encarga de gestionar la conexión con SQLite.

La información de las películas se obtiene de OMDb, mientras que los comentarios y las valoraciones introducidos por los usuarios se guardan en la base de datos local.
La clave de acceso a OMDb se configura mediante el archivo .env, para evitar incluir información privada directamente en el código.
El archivo .env debe mantenerse fuera del repositorio de Git.

8. Comprobación y pruebas
Para la comprobación del correcto funcionamiento de aplicación tanto en la busqueda como en los comentarios y valoraciones que se almacenan en la base de datos SQLite, en el archivo database/peliculas.db
Se puede comprobar los comentarios y valoraciones ya existentes buscando la pelicula Matrix de 1999, algunos de estos comentarios aparecen sin valoracion debido a que no se había implementado esa opción en el momento en el que se guardaron los comentarios 