$(document).ready(function () {
    // Obtener las referencias a los elementos del menú y las secciones
    var menuInicio = $(".nav-link:nth-child(1)");
    var menuProductos = $(".nav-link:nth-child(2)");
    var menuCategorias = $(".nav-link:nth-child(3)");
    var sectionHome = $(".home");
    var sectionProducts = $(".products");
    var sectionCategories = $(".categories");

    // Ocultar todas las secciones excepto la de inicio al cargar la página
    sectionProducts.hide();
    sectionCategories.hide();

    // Obtener el carrito de compras
    var cartItems = obtenerCarritoDeCompras();
    console.log("Carrito de Compras al cargar la pagina: " + obtenerCarritoDeCompras());


    // Función para mostrar la sección Home y ocultar las demás secciones
    function showHomeSection() {
        $("#home-nav").addClass("disabled");
        $("#products-nav").removeClass("disabled");
        $("#categories-nav").removeClass("disabled");
        sectionHome.show();
        sectionProducts.hide();
        sectionCategories.hide();
    }

    // Función para mostrar la sección de Productos y ocultar las demás secciones
    function showProductsSection() {
        $("#products-nav").addClass("disabled");
        $("#home-nav").removeClass("disabled");
        $("#categories-nav").removeClass("disabled");
        sectionHome.hide();
        sectionProducts.show();
        sectionCategories.hide();
    }

    // Función para mostrar la sección de Categorías y ocultar las demás secciones
    function showCategoriesSection() {
        $("#categories-nav").addClass("disabled");
        $("#home-nav").removeClass("disabled");
        $("#products-nav").removeClass("disabled");
        sectionHome.hide();
        sectionProducts.hide();
        sectionCategories.show();
    }

    // Asignar eventos de clic a los elementos del menú
    menuInicio.on("click", function (e) {
        e.preventDefault();
        showHomeSection();
    });

    menuProductos.on("click", function (e) {
        e.preventDefault();
        showProductsSection();
    });

    menuCategorias.on("click", function (e) {
        e.preventDefault();
        showCategoriesSection();
    });

    // Mostrar la sección Home al cargar la página
    showHomeSection();

    // Obtener la referencia al elemento del catálogo de productos
    var catalogueProducts = $(".catalogue-products");

    // Menú de Inicio
    url = "http://localhost:5000/products";
    $.ajax({
        type: "GET",
        url: url,

        success: function (response, status, xhr) {
            console.log("Success Request: " + url);
            console.log(xhr.status + ": " + xhr.statusText);
            console.log("Status: " + status);
            console.log(response);

            var carouselElement = $("#home");

            for (var productKey in response) {
                if (response.hasOwnProperty(productKey)) {
                    var product = response[productKey];

                    // Crear un elemento para el producto
                    var productElement = $("<div>").addClass("product");
                    var imageContainer = $("<div>").addClass("image-container d-flex align-items-center");
                    var imageElement = $("<img>").addClass("img-fluid").attr("src", product.image).attr("alt", "Product Image");
                    var titleElement = $("<h3>").text(product.title);
                    var skuElement = $("<p>").text("SKU: " + productKey);
                    var descriptionElement = $("<p>").text(product.description);
                    var priceElement = $("<p>").text("$" + product.price);

                    // Agregar un controlador de eventos a la imagen
                    imageElement.on("click", function () {
                        var productId = $(this).closest(".product").attr("id");
                        console.log("Ver detalles del producto: " + productId);
                        window.location.href = "product.html?id=" + productId;
                    });

                    // Crear un botón para agregar al carrito
                    var addToCartButton = $("<button>").text("Agregar al carrito").addClass("comp");

                    // Agregar un identificador único al botón
                    addToCartButton.attr("id", "addToCartButton-" + productKey);

                    // Agregar un controlador de eventos al botón
                    addToCartButton.on("click", function () {
                        var productId = $(this).attr("id").split("-")[1];
                        console.log("Agregar al carrito: " + productId);
                        // Aquí puedes agregar la lógica para agregar el producto al carrito
                        agregarProductoAlCarrito(productId);
                        console.log(obtenerCarritoDeCompras());
                        alert("Producto Agregado Correctamente");
                        // Borrar cookie en caso de que sea necesario
                        //deleteCookie("cart");
                    });

                    // Agregar los elementos del producto al elemento del carrusel
                    productElement.attr("id", productKey);
                    imageContainer.append(imageElement);
                    productElement.append(imageContainer, titleElement, skuElement, descriptionElement, priceElement, addToCartButton);
                    carouselElement.append(productElement);
                }
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

    // Menú de Categorías
    categoriesUrl = "http://127.0.0.1:5000/categories";
    $.ajax({
        type: "GET",
        url: categoriesUrl,
        success: function (categories) {
            var categoriesSection = $(".categories");

            categories.forEach(function (category) {
                var categoryId = categories.indexOf(category);
                var categoryName = category.name;
                var categoryElement = $("<div>").addClass("carousel");
                var categoryTitle = $("<h3>").text(categoryName);

                categoriesSection.append(categoryTitle);

                var productsUrl = "http://127.0.0.1:5000/products-by-category/" + categoryId;

                $.ajax({
                    type: "GET",
                    url: productsUrl,
                    success: function (products) {
                        products.forEach(function (product) {
                            var productId = Object.keys(product)[0];
                            var productData = product[productId];

                            var productElement = $("<div>").addClass("product");
                            var imageElement = $("<img>").addClass("img-fluid").attr("src", productData.image).attr("alt", "Product Image");
                            var titleElement = $("<h4>").text(productData.title);
                            var descriptionElement = $("<p>").text(productData.description);
                            var priceElement = $("<p>").text("$" + productData.price);

                            // Crear un botón para agregar al carrito
                            var addToCartButton = $("<button>").text("Agregar al carrito").addClass("comp");

                            // Agregar un identificador único al botón
                            addToCartButton.attr("id", "addToCartButton-" + productId);

                            // Agregar un controlador de eventos al botón
                            addToCartButton.on("click", function () {
                                var productId = $(this).attr("id").split("-")[1];
                                console.log("Agregar al carrito: " + productId);
                                // Aquí puedes agregar la lógica para agregar el producto al carrito
                                agregarProductoAlCarrito(productId);
                                console.log(obtenerCarritoDeCompras());
                                alert("Producto Agregado Correctamente");
                                // Borrar cookie en caso de que sea necesario
                                //deleteCookie("cart");
                            });

                            // Redireccionar al hacer clic en la imagen del producto
                            imageElement.on("click", function () {
                                var productPageUrl = "product.html?id=" + productId;
                                window.location.href = productPageUrl;
                            });

                            productElement.append(imageElement, titleElement, descriptionElement, priceElement, addToCartButton);
                            categoryElement.append(productElement);
                        });
                    },
                    error: function (xhr, status, error) {
                        console.log("Error Request: " + productsUrl);
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

                categoriesSection.append(categoryElement);
            });
        },
        error: function (xhr, status, error) {
            console.log("Error Request: " + categoriesUrl);
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

    // Menú de Productos
    url = "http://localhost:5000/products";
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            // Generar las filas de la tabla con la información de los productos
            var table = $("<table>").addClass("table").addClass("table-striped").addClass("table-hover");
            var tableHead = $("<thead>").addClass("thead-dark");
            tableHead.append("<tr><th class='text-center'>Imagen</th><th class='text-center'>Nombre</th><th class='text-center'>Descripción</th><th class='text-center'>Precio</th><th class='text-center'>Acciones</th></tr>");
            table.append(tableHead);
            var tableBody = $("<tbody>");

            $.each(response, function (index, product) {
                var row = generateProductRow(index, product);
                tableBody.append(row);
            });

            table.append(tableBody);
            catalogueProducts.append(table);
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

    // Función para generar una fila de la tabla con la información del producto
    function generateProductRow(index, product) {
        // Obtener el identificador del producto
        let productId = index;

        // Crear la imagen del producto
        var image = $('<img class="img-fluid">').attr("src", product.image).attr("alt", product.title);
        var imageCell = $("<td class='text-center align-middle'></td>").append(image);

        // Creación de botón para agregar al carrito
        var addToCartButton = $("<button class='add-to-cart' data-product-id='" + productId + "'>Agregar al carrito</button>");
        var buttonCell = $("<td class='text-center align-middle'></td>").append(addToCartButton);

        // Crear la fila de la tabla
        var row = $("<tr>");
        row.append(imageCell);
        row.append('<td class="text-center align-middle">' + product.title + "</td>");
        row.append('<td class="text-center align-middle">' + product.description + "</td>");
        row.append('<td class="text-center align-middle">$' + product.price + '</td>');
        row.append(buttonCell);

        // Al dar clic al botón de carrito
        addToCartButton.click(function () {
            // Acción a realizar cuando se presiona el botón
            agregarProductoAlCarrito(productId);
            console.log(obtenerCarritoDeCompras());
            alert("Producto Agregado Correctamente");
            // Borrar cookie en caso de que sea necesario
            //deleteCookie("cart");
        });

        // Al dar clic a la imagen
        image.click(function () {
            // Redireccionar a otra página cuando se hace clic en la imagen
            var productPageUrl = "product.html?id=" + productId;
            window.location.href = productPageUrl;
        });

        return row;
    }
});