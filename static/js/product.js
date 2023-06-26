var cantidad;
$(document).ready(function () {
    // Obtener el elemento del campo de selección de cantidad
    var cantidadElement = document.getElementById("cantidad");

    // Agregar un controlador de eventos al campo de selección
    cantidadElement.addEventListener("change", function () {
        // Obtener el valor seleccionado
        cantidad = cantidadElement.value;
        // Hacer algo con el valor de cantidad
        // console.log("La cantidad seleccionada es: " + cantidad);
    });
    // Obtener la referencia al enlace Categorías
    var anchorLink = document.getElementById('categories-nav');

    // Obtener el carrito de compras
    var cartItems = obtenerCarritoDeCompras();
    console.log("Carrito de Compras al cargar la pagina: " + obtenerCarritoDeCompras());

    var productId = getParameterByName("id");
    var url = "http://127.0.0.1:5000/products/" + productId;
    $.ajax({
        type: "GET",
        url: url,
        success: function (response, status, xhr) {
            console.log("Success Request: " + url);
            console.log(xhr.status + ": " + xhr.statusText);
            console.log("Status: " + status);
            console.log(response);

            // Mostrar los detalles del producto en la página
            var productDetailsElement = $("<div>").attr('id', 'produc');
            var imageElement = $("<img>").attr("src", response.image).attr("alt", "Product Image");
            var titleElement = $("<h3>").text(response.title);
            var skuElement = $("<p>").text("SKU: " + productId).attr('style', "display: none");
            var descriptionElement = $("<p>").text(response.description).attr('style', "display: none");
            var priceElement = $("<p>").text("$" + response.price).attr('style', "display: none");
            var categoryElement = response.category_id;

            document.getElementById('price').textContent = document.getElementById('price').textContent + response.price;
            document.getElementById('na1').textContent = response.title;
            document.getElementById('sku1').textContent = productId;
            document.getElementById('des1').textContent = response.description;




            // Agregar botón para agregar al carrito


            var btnContainer = $("#btn1");

            var addToCartButton = $("<button>").text("Agregar al carrito");
            addToCartButton.attr("id", "addToCartButton-" + productId);
            addToCartButton.attr("class", "btn btn-primary");




            // Agregar un controlador de eventos al botón
            addToCartButton.on("click", function () {
                var productId = $(this).attr("id").split("-")[1];
                console.log("Agregar al carrito: " + productId);
                if (cantidad == undefined) {
                    cantidad = 1;
                    agregarProductoAlCarrito(productId);
                }
                else {
                    // Repetir el agregado según la cantidad seleccionada
                    for (var i = 0; i < cantidad; i++) {
                        // console.log("La cantidad seleccionada es: " + cantidad);
                        agregarProductoAlCarrito(productId);
                    }
                }
                console.log("Cantidad agregada: " + cantidad);
                console.log(obtenerCarritoDeCompras());
                alert("Producto Agregado Correctamente");
                // Borrar cookie en caso de que sea necesario
                //deleteCookie("cart");
            });

            btnContainer.append(addToCartButton);

            productDetailsElement.append(imageElement, titleElement, skuElement, descriptionElement, priceElement);
            $("#productDetails").append(productDetailsElement);

            // Mostrar los productos relacionados en la página
            var relatedProductsElement = $("#relatedProducts");

            for (var i = 0; i < response.related_products.length; i++) {
                var relatedProductId = response.related_products[i];
                var getRelatedProductUrl = "http://127.0.0.1:5000/products/" + relatedProductId;
                var relatedProductUrl = "product.html?id=" + relatedProductId;

                $.ajax({
                    type: "GET",
                    url: getRelatedProductUrl,
                    success: function (relatedResponse) {
                        var relatedProductElement = $("<div>").attr('class', 'container').attr('style', " padding: 10%;  border: 2px solid #ccc; /* Establece un borde de 2 píxeles de ancho y color gris claro (#ccc) */ padding: 20px; /* Agrega un espacio interno de 20 píxeles alrededor del contenido del div */  /* Establece un ancho de 200 píxeles para el div */ /* Establece una altura de 200 píxeles para el div */ box - sizing: border - box; /* Incluye el tamaño del borde en el ancho y la altura total del div */");
                        var relatedProductLink = $("<a>").attr("href", relatedProductUrl);
                        var relatedImageElement = $("<img>").attr("src", relatedResponse.image).attr("alt", "Related Product Image");
                        var relatedTitleElement = $("<h3>").text(relatedResponse.title);
                        var relatedSkuElement = $("<p>").text("SKU del producto relacionado: " + relatedProductId);

                        relatedProductLink.append(relatedImageElement);
                        relatedProductElement.append(relatedProductLink, relatedTitleElement, relatedSkuElement);
                        relatedProductsElement.append(relatedProductElement);

                        // Mostrar la categoría del producto relacionado
                        $.ajax({
                            type: "GET",
                            url: "http://127.0.0.1:5000/categories/" + categoryElement,
                            success: function (response) {
                                document.getElementById("category-name").innerHTML = response["name"];
                            }
                        });
                    },
                    error: function (xhr, status, error) {
                        console.log("Error Request: " + relatedProductUrl);
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

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}