#Importamos el modulo requests para poder hacer consultas a la API de OMDB
import requests as consulta
#Importamos el modulo dotenv para poder cargar las variables de entorno desde el archivo .env
from dotenv import load_dotenv
#importamos os para acceder a las variables del entorno
import os 

load_dotenv()  # Carga las variables de entorno desde el archivo .env
#Obtenemos la clave de la API de OMDB desde las variables de entorno

API_KEY = os.getenv("OMDB_API_KEY")

#Funcion para buscar una pelicula en la API de OMDB
def buscar_pelicula(titulo,anio=None):
    #Creamos una variable con los parametros que introducimos
    parametros = {"apikey":API_KEY,
                  "s":titulo}
    #Si el usuario a añadido un año de estreno se añade a la consulta
    if anio is not None:
        parametros["y"]= anio
    #Eviamos la peticion a OMDB
    try:
        respuesta =consulta.get("https://www.omdbapi.com/",params=parametros,timeout=10)
    except consulta.RequestException:
        return {"error": "No se ha podido conectar con OMDb"}
    #Si la respuesta es correcta (codigo 200) devolvemos el resultado en formato JSON
    if respuesta.status_code == 200:
        #Convertimos la respuesta de OMDB a un diccionario de Python
        datos = respuesta.json()
        #Comprobamos si la OMDB ha encontradola pelicula
        if datos["Response"] == "True":
            return datos
        #Si no encuetra la pelicula devolvemos None
        else:
            return None
    #Si el código http no es 200, devolvemos error 
    else:
        return {"error": "No se ha podido prrocesar la peticion"}
#Función para obtener detalles de una pelicula
def obtener_detalles_pelicula(id_pelicula):
    #Creamos una variable con los parametros de la consulta 
    parametros = {
        "apikey":API_KEY,
        "i":id_pelicula}
    try:
        #Enviamos la petición a OMDB
        respuesta = consulta.get("https://www.omdbapi.com/",params=parametros,timeout=10)
    except consulta.RequestException:
        return {"error":"No se ha podido conectar con OMDb"}
    #Comprobamos si la respuesta es correcta
    if respuesta.status_code == 200:
        #Convertimos la respuesta en un diccionario
        datos = respuesta.json()
        #Comprobamos si OMDB ha encontrado la pelicula
        if datos ["Response"] == "True":
            return datos
        else:
            return None
    #Si el codigo http no es 200, devolvemos error 
    else:
        return {"error":"OMDb no ha podido procesar la peticion"}

