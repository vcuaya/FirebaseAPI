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
    delete = FirebaseConnection(credentials_path)

    # Delete a category
    # Eliminar una categoría
    delete.delete_category("1")

    # Delete a product
    # Eliminar un producto
    delete.delete_product("ABC123")
