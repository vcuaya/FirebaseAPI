// Función para obtener el valor de una cookie
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
    }
    }
    return null;
}
var cartItems = obtenerCarritoDeCompras();
// Función para establecer una cookie con un nombre, valor y tiempo de expiración
function setCookie(cookieName, cookieValue, daysToExpire) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";expires=" + expirationDate.toUTCString() + ";path=/";
    document.cookie = cookie;
}

// Función para eliminar una cookie estableciendo su fecha de expiración en el pasado
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Agregar un producto al carrito
function agregarProductoAlCarrito(productoId) {
    if (cartItems) {
    cartItems.push(productoId);
    } else {
    cartItems = [productoId];
    }
    // Guardar el carrito en una cookie con una duración de 7 días
    setCookie("cart", JSON.stringify(cartItems), 7);
}

// Obtener el carrito de compras almacenado en la cookie
function obtenerCarritoDeCompras() {
    var cart = getCookie("cart");
    if (cart) {
    return JSON.parse(cart);
    }
    return [];
}

// Función para eliminar un producto del carrito en las cookies
function eliminarProductoDelCarrito(productoId) {
    // Obtener el carrito de compras almacenado en las cookies
    var cartItems = obtenerCarritoDeCompras();
  
    // Buscar el índice del producto en el carrito
    var indice = cartItems.indexOf(productoId);
    // Filtrar el carrito para eliminar todas las ocurrencias del producto
    cartItems = cartItems.filter(id => id !== productoId);
    // Guardar el carrito actualizado en la cookie
    console.log(getCookie("cart"));
    setCookie("cart", JSON.stringify(cartItems), 7);
    
  }