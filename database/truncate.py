import os
from connection import FirebaseConnection

# Use example
# Ejemplo de uso
if __name__ == "__main__":

    # Get the relative path of the ecommerceCredentials.json file
    # Obtener la ruta relativa del archivo ecommerceCredentials.json
    credentials_path = os.path.join(os.path.dirname(
        __file__), '..', 'config', 'ecommerceCredentials.json')

    # Create an instance of FirebaseConnection
    # Crear una instancia de FirebaseConnection
    truncate = FirebaseConnection(credentials_path)

    # Restore the database
    # Restaurar la base de datos
    truncate.truncate_database()
