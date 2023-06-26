import os
from connection import FirebaseConnection

# Use example
# Ejemplo de uso
if __name__ == "__main__":

    # Get the relative path of the ecommerceCredentials.json file
    # Obtener la ruta relativa del archivo ecommerceCredentials.json
    credentials_path = os.path.join(os.path.dirname(
        __file__), '..', 'config', 'ecommerceCredentials.json')

    # Get the relative path of the ecommerceBackup.json file
    # Obtener la ruta relativa del archivo ecommerceBackup.json
    backup_path = os.path.join(os.path.dirname(
        __file__), '..', 'config', 'ecommerceBackup.json')

    # Create an instance of FirebaseConnection
    # Crear una instancia de FirebaseConnection
    restore = FirebaseConnection(credentials_path)

    # Restaurar la base de datos
    restore.restore_backup(backup_path)
