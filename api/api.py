import os
import sys
from flask_cors import CORS
from flask import Flask, jsonify, request
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from database.connection import FirebaseConnection


app = Flask(__name__)
CORS(app)

credentials_path = os.path.join(os.path.dirname(
    __file__), '..', 'config', 'ecommerceCredentials.json')

database = FirebaseConnection(credentials_path)


@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Ecommerce API"}), 200


@app.route('/categories-add', methods=['POST'])
def create_category():
    data = request.get_json()
    category_id = data['category_id']
    category_name = data['category_name']
    database.create_category(category_id, category_name)
    return jsonify({"message": "Category created successfully"}), 201


@app.route('/products-add', methods=['POST'])
def create_product():
    data = request.get_json()
    database.create_product(data['product_id'], data['product_data'])
    return jsonify({"message": "Product created successfully"}), 201


@app.route('/categories', methods=['GET'])
def get_categories():
    categories_data = database.read_all_categories()
    return jsonify(categories_data), 200


@app.route('/products', methods=['GET'])
def get_products():
    products_data = database.read_all_products()
    return jsonify(products_data), 200


@app.route('/categories/<category_id>', methods=['GET'])
def get_category(category_id):
    category_data = database.read_category(category_id)
    if category_data is None:
        return jsonify({"message": "Category not found"}), 404
    return jsonify(category_data), 200


@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product_data = database.read_product(product_id)
    if product_data is None:
        return jsonify({"message": "Product not found"}), 404
    return jsonify(product_data), 200


@app.route('/products-by-category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    products_data = database.get_products_by_category(category_id)
    if products_data is None:
        return jsonify({"message": "Products not found"}), 404
    return jsonify(products_data), 200


@app.route('/categories/<category_id>', methods=['PUT'])
def update_category(category_id):
    data = request.get_json()
    new_name = data['new_name']
    database.update_category_name(category_id, new_name)
    return jsonify({"message": "Category updated successfully"}), 200


@app.route('/products/<product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    new_price = data['new_price']
    database.update_product_price(product_id, new_price)
    return jsonify({"message": "Product updated successfully"}), 200


@app.route('/categories/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    database.delete_category(category_id)
    return jsonify({"message": "Category deleted successfully"}), 204


@app.route('/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    database.delete_product(product_id)
    return jsonify({"message": "Product deleted successfully"}), 204


if __name__ == '__main__':
    app.run(threaded=True)
