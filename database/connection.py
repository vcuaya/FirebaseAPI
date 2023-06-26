import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


class FirebaseConnection:
    def __init__(self, credentials_path):
        # Fetch the service account key JSON file contents
        # Obtener el contenido del archivo JSON de la clave de la cuenta de servicio
        cred = credentials.Certificate(credentials_path)

        # Initialize the app with a service account, granting admin privileges
        # Inicializar la aplicación con una cuenta de servicio, otorgando privilegios de administrador
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://ecommerce-33da9-default-rtdb.firebaseio.com/'
        })

        # Get a reference to the Firebase Realtime Database
        # Obtener una referencia a la base de datos en tiempo real de Firebase
        self.db = db.reference()

# Create methods
# Métodos para crear datos en la base de datos
    def create_category(self, category_id, category_name):
        category_ref = self.db.child("categories").child(category_id)
        category_ref.set({"name": category_name})

    def create_product(self, product_id, product_data):
        product_ref = self.db.child("products").child(product_id)
        product_ref.set(product_data)

# Read methods
# Métodos para leer datos de la base de datos
    def read_all_categories(self):
        categories_ref = self.db.child("categories")
        categories_data = categories_ref.get()
        return categories_data

    def read_all_products(self):
        products_ref = self.db.child("products")
        products_data = products_ref.get()
        return products_data

    def read_category(self, category_id):
        category_ref = self.db.child("categories").child(category_id)
        category_data = category_ref.get()
        return category_data

    def read_product(self, product_id):
        product_ref = self.db.child("products").child(product_id)
        product_data = product_ref.get()
        return product_data

    def get_products_by_category(self, category_id):
        products_ref = self.db.child("products")
        products_data = products_ref.get()
        filtered_products = []
        for product_id, product in products_data.items():
            if product.get("category_id") == category_id:
                filtered_products.append({product_id: product})
        return filtered_products

# Update methods
# Métodos para actualizar datos en la base de datos
    def update_category_name(self, category_id, new_name):
        category_ref = self.db.child("categories").child(category_id)
        category_ref.update({"name": new_name})

    def update_product_price(self, product_id, new_price):
        product_ref = self.db.child("products").child(product_id)
        product_ref.update({"price": new_price})

# Delete methods
# Métodos para eliminar datos de la base de datos
    def delete_category(self, category_id):
        category_ref = self.db.child("categories").child(category_id)
        category_ref.delete()

    def delete_product(self, product_id):
        product_ref = self.db.child("products").child(product_id)
        product_ref.delete()

# Restore methods
# Métodos para restaurar datos de la base de datos
    def restore_backup(self, backup_path):
        with open(backup_path, 'r', encoding='utf-8') as file:
            backup_data = json.load(file)

        # Delete existing data
        # Eliminar datos existentes
        self.db.delete()

        # Restore categories
        # Restaurar categorías
        categories_ref = self.db.child("categories")
        categories_ref.set(backup_data.get("categories"))

        # Restore products
        # Restaurar productos
        products_ref = self.db.child("products")
        products_ref.set(backup_data.get("products"))

# Truncate methods
# Métodos para eliminar todos los datos de la base de datos
    def truncate_database(self):
        self.db.delete()
