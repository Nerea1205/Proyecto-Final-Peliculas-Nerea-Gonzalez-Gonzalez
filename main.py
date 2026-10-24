#Importamos el modulo FastAPI para poder crear la API
from fastapi import FastAPI,Request,Body
#Importamos la funcion buscar_pelicula del modulo omdb 
from servicios.omdb import buscar_pelicula,obtener_detalles_pelicula
#Importamos Jinja2Templates para mostrar archivos html
from fastapi.templating import Jinja2Templates
#Importamos Staticfiles para importar los archivos de css y javascript
from fastapi.staticfiles import StaticFiles
#Importamos de consultas las funciones para poder realizar la parte de comentarios
from consultas import insert_data,select_by_id_pelicula,select_valoracion_media
#Importamos date para obtener la fecha actual
from datetime import date
#Creamos la aplicacion FastAPI
app = FastAPI()

#Indicamos la ubicacion del archivo html en la carpeta templates
plantillas = Jinja2Templates(directory="templates")
#Permitimos acceder a los archivos de la carpeta static
app.mount("/static",StaticFiles(directory="static"),name="static")

#Creamos la ruta principal de la API 
@app.get("/")
def inicio(request: Request):
    #Devolvemos un mensaje de bienvenida
    return plantillas.TemplateResponse(request=request,name="inicio.html",context={})

#Creamos la ruta para buscar una pelicula por el titulo
@app.get("/buscar")
def buscar(titulo: str,anio:int|None = None):
    #Llamamos a la funcion buscar_pelicula del modulo omdb 
    peliculas = buscar_pelicula(titulo,anio)
    #Comprobamos si se ha encontrado peliculas
    if peliculas is None:
        return {"mensaje":"No se han encontrado películas"}
    #Comprobamos si se ha producido un error
    if "error" in peliculas:
        return peliculas
    #Si hemos encontrado la pelicula devolvemos el resultado
    return peliculas
#Creamos una ruta para obtener los detalles de una pelicula
@app.get("/detalle")
def detalle(id_pelicula:str):
    #LLamamos a la funcion que obtiene los detalles de la película
    pelicula = obtener_detalles_pelicula(id_pelicula)
    #Comprobamos si ha encontrado la pelicula
    if pelicula is None:
        return {"mensaje":"No se han encontrado detalles de la película"}
    #Comprobamos si se ha producido un error
    if "error" in pelicula:
        return pelicula
    #Devolvemos los detalles de la película
    return pelicula
#Creamos una ruta para mostrar los comentarios de una película
@app.get("/comentarios")
def obtener_comentarios(id_pelicula:str):
    #Buscamos los comentarios de la película seleccionada
    comentarios = select_by_id_pelicula(id_pelicula)
    #Devolvemos los comentarios encontrados
    return {"comentarios":comentarios}
#Creamos una ruta para obtener la valoracion media de una pelicula
@app.get("/valoracion-media")
def obtener_valoracion_media(id_pelicula:str):
    #Obtenemos la valoracion media de la pelicula
    media = select_valoracion_media(id_pelicula)
    #Devolvemos la valoracion media
    return {"media": media}
#Creamos una ruta para guardar un nuevo comentario
@app.post("/comentarios")
def guardar_comentario(datos:dict = Body(...)):
    #Obtenemos el id de la pelicula seleccionada
    id_pelicula = datos["id_pelicula"]
    #Obtenemos el nombre de la persona que escribe el comentario
    persona = datos["persona"]
    #Obtenemos el texto del comentario
    comentario = datos["comentario"]
    #Obtenemos la valoracion de la pelicula
    valoracion = int(datos["valoracion"])
    #Obtenemos la fecha actual y la convertimos en str
    fecha = str(date.today())
    #Agrupamos los datos en una tupla respetando el orden para que coincida con isert_data en consultas.py
    datos_comentario = (id_pelicula, persona, comentario, fecha,valoracion)
    #Guardamos el comentario en la base de datos
    insert_data(datos_comentario)
    #Devolvemos un mensaje para indicar que se ha guardado correctamente
    return{"mensaje":"Comentario guardado correctamente"}