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
    update = FirebaseConnection(credentials_path)

    # Update a category
    # Actualizar una categoría
    update.update_category_name("1", "New Category Name")

    # Update a product
    # Actualizar un producto
    update.update_product_price("ABC123", 10999.99)
