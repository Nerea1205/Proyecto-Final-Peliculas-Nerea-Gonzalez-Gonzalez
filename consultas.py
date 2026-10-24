#Importamos el modulo conexion para poder conectarnos a la base de datos
from conexion import Conexion

#Creamos la funcion select_all para poder obtener todos los datos de la tabla Comentario
def select_all():
    #Creamos una conexion a la base de datos y ejecutamos la consulta SQL para obtener todos los datos
    conexionSelect = Conexion("SELECT * FROM Comentario")
    #Guardamos la respuesta de la consulta SQL en una variable y cerramos la conexion a la base de datos
    respuesta = conexionSelect.obtener_datos()
    conexionSelect.cerrar()
    #Devolvemos la respuesta de la consulta SQL
    return respuesta
#Creamos la funcion insert_data para poder insertar datos en la tabla Comentario
def insert_data(data):
    #Creamos una conexion a la base de datos y ejecutamos la consulta SQL para insertar los datos
    conexionInsert = Conexion("INSERT INTO Comentario (id_pelicula,persona,comentario,fecha,valoracion) VALUES (?,?,?,?,?)",data)
    #Guardamos la respuesta de la consulta SQL en una variable y cerramos la conexion a la base de datos
    conexionInsert.con.commit()
    conexionInsert.cerrar()

#Creamos la funcion select_by_id_pelicula para poder obtener los datos de la tabla Comentario por id_pelicula
def select_by_id_pelicula(id_pelicula):
    #Creamos una conexion a la base de datos y ejecutamos la consulta SQL para obtener los datos por id_pelicula
    conexionSelectBy = Conexion("SELECT * FROM Comentario WHERE id_pelicula = ?",(id_pelicula,))
    #Guardamos la respuesta de la consulta SQL en una variable y cerramos la conexion a la base de datos
    respuesta = conexionSelectBy.obtener_datos()
    conexionSelectBy.cerrar()
    #Devolvemos la respuesta de la consulta SQL
    return respuesta
#Creamos una funcion para obtener la valoracion media de una pelicula
def select_valoracion_media(id_pelicula):
    #Creamos la conexion a la base de datos y calculamos la media
    conexionSelectMedia = Conexion("SELECT AVG(valoracion) FROM Comentario WHERE id_pelicula = ?",(id_pelicula,))
    #Guardamos el resultado de la consulta
    respuesta = conexionSelectMedia.obtener_datos()
    #Cerramos la conexion con la base de datos
    conexionSelectMedia.cerrar()
    #Devolvemos la valoracion media
    return respuesta [0][0]

