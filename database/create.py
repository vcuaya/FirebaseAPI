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
    create = FirebaseConnection(credentials_path)

    # Create a category
    # Crear una categoría
    create.create_category("1", "Accesorios")

    # Create a product
    # Crear un producto
    create.create_product("ABC123", {
        "category_id": 1,
        "description": "Example product",
        "image": "https://example.com/product.jpg",
        "price": 99.99,
        "title": "Example Product"
    })
