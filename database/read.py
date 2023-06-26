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
    read = FirebaseConnection(credentials_path)

    # Read all categories
    # Leer todas las categorías
    categories_data = read.read_all_categories()
    print(categories_data)

    # Read all products
    # Leer todos los productos
    products_data = read.read_all_products()
    print(products_data)

    # Read a category
    # Leer una categoría
    category_data = read.read_category("1")
    print(category_data)

    # Read a product
    # Leer un producto
    product_data = read.read_product("ABC123")
    print(product_data)
