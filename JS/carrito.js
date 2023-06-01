let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let carritoAbierto = false

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", cerrarCarrito);

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
     let carritoContent = document.createElement("div")
     carritoContent.className = "modal-content"
     carritoContent.innerHTML = `
     <img src="${product.img}">
     <h3>${product.nombre}</h3>
     <p>${product.precio} $</p>
     <p>Cantidad: ${product.cantidad}</p>
     <p>Total: ${product.cantidad * product.precio}</p>
     `;

     modalContainer.append(carritoContent);

     let eliminar = document.createElement("span");

     eliminar.innerText = "❌";
     eliminar.className = "delete-product";
     carritoContent.append(eliminar);

     eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
}

const cerrarCarrito = () => {
    carritoAbierto = false
    modalContainer.style.display = "none";
}

verCarrito.addEventListener("click", () => {
    carritoAbierto = !carritoAbierto;
    actualizarVisual();
});

const agregarProducto = (product) => {
    const repeat = carrito.some((repeatProduct) => {
        repeatProduct.id === product.id
    });

    if (repeat){
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        });
    } else {
        carrito.push({
            id : product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    }
        console.log(carrito);
        saveLocal();
        actualizarVisual();
}

const eliminarProducto = () => {
    const foundId = carrito.find ((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    saveLocal();
    actualizarVisual();
};

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarVisual = () => {
    CantidadCarrito.style.display = (carrito.length > 0)? "block" : "none";
    if (carritoAbierto) {
        pintarCarrito();
    } else {
        cerrarCarrito();
    }
};
