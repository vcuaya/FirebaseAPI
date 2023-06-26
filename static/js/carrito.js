function redirigirACompra() {
    // Redirigir a la página de compra
    // window.location.href = "agradecimiento.html";
    deleteCookie("cart");
    window.location.href = "index.html"
}
function calcularTotal() {
    var total = 0;
  
    // Recorrer los productos en el nuevoArray y sumar los subtotales
    nuevoArray.forEach(producto => {
        if(document.getElementById(`subtotal-${producto.id}`)){
        var subtotalElement = document.getElementById(`subtotal-${producto.id}`);
        var subtotal = parseFloat(subtotalElement.textContent.replace("$ ", ""));
        console.log(subtotalElement);
        total += subtotal;
        }
    });
    
    // Actualizar el valor del total en el elemento HTML
    var totalElement = document.getElementById("total-value");
    totalElement.textContent = total;
}
//Array que contendra los productos y sus datos
var nuevoArray = [];
// Función para crear el HTML de cada producto
function crearProductoHTML(producto) {
    return `
        <div class="container shadow p-3 mb-3 bg-white rounded">
            <div class="row shoppingCartItem">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0 ">
                            ${producto.titulo}
                        </h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">$ ${producto.precio}</p>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <!-- Agrega aquí los campos adicionales que necesites para cada producto -->
                        <input type="number" class="shopping-cart-quantity-input shoppingCartItemQuantity" width="50" name="cantidad" value="${producto.cantidad}">
                    </div>
                </div>
                <div class="col-3">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <!-- Agrega aquí los campos adicionales que necesites para cada producto -->
                        <p id="subtotal-${producto.id}" class="item-price mb-0 shoppingCartSubtotal">$ ${producto.cantidad * producto.precio}</p>
                        <a href="#" class="btn btn-danger buttonDelete">X</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para eliminar un producto del nuevoArray
function eliminarProducto(id) {
    nuevoArray = nuevoArray.filter(producto => producto.id !== id);
}


// Función para actualizar el subtotal
function actualizarSubtotal() {
  const cantidadInput = this; // El campo de cantidad que se modificó
  const productoContainer = cantidadInput.closest(".shoppingCartItem"); // El contenedor del producto
  const productoPrecio = productoContainer.querySelector(".shoppingCartItemPrice"); // El elemento p que muestra el precio
  const subtotalElement = productoContainer.querySelector(".shoppingCartSubtotal"); // El elemento p del subtotal
  
  // Obtener el precio y la cantidad del producto
  const precio = parseFloat(productoPrecio.textContent.replace("$ ", ""));
  const cantidad = parseInt(cantidadInput.value);
  
  // Calcular el subtotal
  const subtotal = precio * cantidad;
  
  // Actualizar el texto del elemento p del subtotal
  subtotalElement.textContent = `$ ${subtotal}`;
}

function mostrarProductos() {
    // Muestra los productos en el contenedor
    const productosContainer = document.getElementById("productos-container");
    nuevoArray.forEach(producto => {
        const productoHTML = crearProductoHTML(producto);
        productosContainer.innerHTML += productoHTML;
    });
}


$(document).ready(function () {
    // Obtener el carrito de compras
    var cartItems = obtenerCarritoDeCompras();
    console.log("Carrito de Compras al cargar la pagina: " + obtenerCarritoDeCompras());
    
    // Crea un objeto para almacenar el nombre y la cantidad de cada elemento
    var objetoCantidad = {};
    // Recorre el array y cuenta la cantidad de cada elemento
    cartItems.forEach(elemento => {
    if (objetoCantidad[elemento]) {
        objetoCantidad[elemento] += 1;
    } else {
        objetoCantidad[elemento] = 1;
    }
    });
    // Crea un nuevo array con los objetos que contienen el nombre y la cantidad
    var arrayConIdCantidad = Object.keys(objetoCantidad).map(id => {
    return { id, cantidad: objetoCantidad[id] };
    });
    // Imprime el nuevo array en la consola
    console.log(arrayConIdCantidad);
    
    //Iteramos cada producto para obtener sus detalles
    arrayConIdCantidad.forEach(objeto => {
        var id = objeto.id;
        var cantidad = objeto.cantidad;
        var productId = id;
        var url = "http://127.0.0.1:5000/products/" + id;
        $.ajax({
            type: "GET",
            url: url,
            success: function (response, status, xhr) {
                console.log("Success Request: " + url);
                console.log(xhr.status + ": " + xhr.statusText);
                console.log("Status: " + status);
                console.log(response);
                // Actualiza nuevoArray con los datos obtenidos
                nuevoArray.push({
                   titulo: response.title,
                   precio: response.price,
                   id: id,
                   cantidad: cantidad
                });

                // Verifica si es el último elemento y luego imprime nuevoArray
                if (nuevoArray.length === arrayConIdCantidad.length) {
                    console.log(nuevoArray);
                    const productosContainer = document.getElementById("productos-container");
                    nuevoArray.forEach(producto => {
                        const productoHTML = crearProductoHTML(producto);
                        productosContainer.innerHTML += productoHTML;
                    });
                    // Obtener todos los campos de cantidad
                    const cantidadInputs = document.querySelectorAll(".shoppingCartItemQuantity");

                    // Agregar el evento input a cada campo de cantidad
                    cantidadInputs.forEach(input => {
                        input.addEventListener("input", actualizarSubtotal);
                        input.addEventListener("input", calcularTotal);
                    });
                     // Obtener todos los botones de eliminación
                    const deleteButtons = document.querySelectorAll(".buttonDelete");

                    // Agregar el evento clic a cada botón de eliminación
                    deleteButtons.forEach(button => {
                        button.addEventListener("click", function () {
                        var productoContainer = this.closest(".shoppingCartItem");
                        var idProducto = productoContainer.querySelector(".shoppingCartItemTitle").textContent.trim();
                        eliminarProducto(idProducto);
                        productoContainer.remove();
                        eliminarProductoDelCarrito(id);
                        calcularTotal();
                        });                    
                    });
                    cantidadInputs.forEach(input => {
                        input.addEventListener("input", calcularTotal);
                    });
                    calcularTotal();
                }                
                
            },
            error: function (xhr, status, error) {
                console.log("Error Request: " + url);
                switch (xhr.status) {
                    case 400:
                        console.log(xhr.status + ": " + xhr.statusText);
                        console.log("Status: " + status);
                        break;
                    default:
                        console.log(xhr.status + ": " + xhr.statusText);
                        console.log("Status: " + status);
                }
            }
        });
    });
     
});



   