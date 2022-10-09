var suma = 0;
contCarro = 0;


var1 = 0;
var2 = 0;

productosCarritos = [];
document.addEventListener('DOMContentLoaded', () => {
    mostrarproductos();

});


const productosBebe = document.querySelector('.bebe');
const productosCuidado = document.querySelector('.cuidado');
const productosSuplemento = document.querySelector('.suplemento');
const productosDermo = document.querySelector('.dermocosmetica');
const productosPerfumes = document.querySelector('.perfumes');
const botonCarro = document.querySelector('.btnCarro');
const botonBorrarCarro = document.querySelector('.btnBorrarCarro');
const carro = document.querySelector('.contadorProductos');



function mostrarproductos() {
    fetch('../json/productos.json')
        .then(mostrar => mostrar.json())

    .then(productos => {
        productos.forEach(items => {
            const divProductos = document.createElement('div');
            divProductos.classList.add('card');
            const imgProducto = document.createElement("img");
            imgProducto.classList.add("imgProducto");
            imgProducto.src = items.img;
            const titulo = document.createElement("h2");
            titulo.classList.add("titulo");
            titulo.textContent = items.Titulo;
            const nombre = document.createElement("h3");
            nombre.classList.add("nombre");
            nombre.textContent = items.Nombre;
            const precio = document.createElement("h4");
            precio.classList.add("precio");
            precio.textContent = `$ ${items.Precio}`;
            const btnAumentar = document.createElement("button");
            btnAumentar.classList.add("btn-aumentar");
            btnAumentar.textContent = "+";
            btnAumentar.onclick = () => {
                cantidad.value = parseInt(cantidad.value) + 1;
            }
            const btnDisminuir = document.createElement("button");
            btnDisminuir.classList.add("btn-disminuir");
            btnDisminuir.textContent = "-";
            btnDisminuir.onclick = () => {
                if (cantidad.value > 0)
                    cantidad.value = parseInt(cantidad.value) - 1;
            }
            const cantidad = document.createElement("input");
            cantidad.classList.add("inputCantidad");
            cantidad.value = 0;
            const btnAgregarCarrito = document.createElement("button");
            btnAgregarCarrito.classList.add("btn-carrito");
            btnAgregarCarrito.textContent = "Agregar al Carrito";
            btnAgregarCarrito.onclick = () => {
                agregarCarrito(items.id);
                swal({
                    title: "Producto Agregado al Carrito",

                    icon: "success",
                    button: "OK",
                });
                sumarVentas(items.Precio);

            };
            divProductos.appendChild(imgProducto);
            divProductos.appendChild(titulo);
            divProductos.appendChild(nombre);
            divProductos.appendChild(precio);
            divProductos.appendChild(btnDisminuir);
            divProductos.appendChild(cantidad);
            divProductos.appendChild(btnAumentar);
            divProductos.appendChild(btnAgregarCarrito);
            switch (items.categoria) {

                case "suplemento":
                    productosSuplemento.appendChild(divProductos);
                    break;
                case "bebe":
                    productosBebe.appendChild(divProductos);
                    break;
                case "perfume":
                    productosPerfumes.appendChild(divProductos);
                    break;
                case "cuidado":
                    productosCuidado.appendChild(divProductos);
                    break;
                case "dermocosmetica":
                    productosDermo.appendChild(divProductos);
                    break;

            }

        });
    })
}




function sumarVentas(precio) {
    suma = suma + precio;
}
const guardarLocalmente = (clave, valor) => { localStorage.setItem(clave, valor) }

var productoEncontrado;

function agregarCarrito(id) {
    fetch('../json/productos.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            productoEncontrado = productos.find(productos => productos.id === id);
            productosCarritos.push(productoEncontrado);
            guardarLocalmente("productos", JSON.stringify(productosCarritos));
            const cont = document.createElement('div');
            const carrocont = document.createElement("h6");
            carrocont.classList.add("carrocont");
            contCarro = productosCarritos.length;
            console.log(contCarro);
            carrocont.textContent = contCarro;
            console.log(contCarro);
            cont.append(carrocont);
            carro.appendChild(cont);
            console.log(contCarro);

        });

}



//FUNCION PARA RECUPERAR EL LOCAL STORAGE
recuperarLs = () => {
    let recuperar = JSON.parse(localStorage.getItem("productos"))
    if (recuperar) {
        recuperar.forEach(element => (
            agregarCarrito(element.id)
        ))
    }
}
recuperarLs();


//MODAL CARRITO

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    contCarro === 0 ? (modal.style.display = "inblock") (swal({title: "Carrito Vacío",icon: "error",button: "OK"})) : (modal.style.display = "block") (mostrarCarrito());
}


span.onclick = function() {
    modal.style.display = "none";
    location.reload();
}
window.onclick = function(event) {

    (event.target == modal) &&
    (modal.style.display = "none")
}




// FUNCION PARA MOSTRAR EL CARRITO EN EL MODAL
function mostrarCarrito() {
    for (const items of productosCarritos) {
        const divProductos = document.createElement('div');
        const nombreCarro = document.createElement("h5");
        nombreCarro.classList.add("nombreCarro");
        nombreCarro.textContent = `${items.Nombre}    x   1`;
        const precioCarro = document.createElement("h5");
        precioCarro.classList.add("precioCarro");
        precioCarro.textContent = `$ ${items.Precio}`;
        divProductos.appendChild(nombreCarro);
        divProductos.appendChild(precioCarro);
        divProductos.appendChild(btnCarro);
        botonCarro.appendChild(divProductos);
        divProductos.appendChild(btnBorrarCarro);
        botonBorrarCarro.appendChild(divProductos);
    }
}
const btnCarro = document.createElement("button");
btnCarro.classList.add("btn-carro");
btnCarro.textContent = "Comprar Productos";
btnCarro.onclick = () => {
    swal({
            title: "Forma de Pago",

            buttons: ["Efectivo / Débito", "Crédito"],

        })
        .then((contado) => {
            if (contado) {
                suma = suma * 1.21;
                swal(`La suma de los productos del carrito pagando en Crédito es $${suma.toFixed(2)}`, {
                    icon: "success",

                });

            } else {
                swal(`La suma de los productos del carrito pagando en Efectivo / Debito es $${suma.toFixed(2)}`, {
                    icon: "success",
                });
            }
        });
};


const btnBorrarCarro = document.createElement("button");
btnBorrarCarro.classList.add("btn-borrar");
btnBorrarCarro.textContent = "Borrar Productos";
btnBorrarCarro.onclick = () => {
    localStorage.clear();
    location.reload();
};