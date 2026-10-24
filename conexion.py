#Importamos el modulo sqlite3 para poder conectarnos a la base de datos
import sqlite3

#Creamos la clase Conexion para poder conectarnos a la base de datos y ejecutar consultas
class Conexion:
    #Creamos el metodo constructor de la clase Conexion
    def __init__(self, sql_query,parametros=()):
        #Abrimos la conexion a la base de datos peliculas.db que se encuentra en la carpeta database
        self.con = sqlite3.connect("database/peliculas.db")
        #Creamos un cursor para poder ejecutar consultas SQL
        self.cursor = self.con.cursor()
        #Ejecutamos la consulta SQL que se le pase como parametro al constructor de la clase Conexion
        self.cursor.execute(sql_query,parametros)
    #Creamos el metodo obtener_datos para poder obtener los datos de la consulta SQL ejecutada
    def obtener_datos(self):
        return self.cursor.fetchall()
    #Creamos el metodo cerrar para poder cerrar la conexion a la base de datos
    def cerrar(self):
        return self.con.close()
