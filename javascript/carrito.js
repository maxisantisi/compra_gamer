class Producto {
    constructor (id,nombre,precio,img){
        this.id = id ;
        this.nombre = nombre ;
        this.precio = precio ;
        this.img = img ;
        this.cantidad = 1 ;
    }
}

const producto1 = new Producto (1, "Memoria Ram", 75 , "image/memoria.jpg");
const producto2 = new Producto (2, "Mother Asus", 80 , "image/mother_asus.jpg");
const producto3 = new Producto (3, "Mother Prime", 80 , "image/mother_prime.jpg");
const producto4 = new Producto (4, "Mouse", 30 , "image/mouse.jpg");
const producto5 = new Producto (5, "Notebook", 1.706 , "image/notebook.jpg");
const producto6 = new Producto (6, "Placa de video 1630", 162 , "image/placa_1630.jpg");
const producto7 = new Producto (7, "Placa de video 1660", 308 , "image/placa_1660.jpg");
const producto8 = new Producto (8, "Placa de video 3050", 365 , "image/placa_3050.jpg");
const producto9 = new Producto (9, "Placa MSI", 34 , "image/placa_msi.jpg");
const producto10 = new Producto (10, "SmartWatch", 145 , "image/reloj.jpg");
const producto11 = new Producto (11, "Silla Gamer", 406 , "image/silla.jpg");
const producto12 = new Producto (12, "Tablet", 322 , "image/tablet.jpg");
const producto13 = new Producto (13, "Fuente Asus", 65 , "image/fuente_asus.jpg");
const producto14 = new Producto (14, "Fuente Thor", 170 , "image/fuente_thor.jpg");
const producto15 = new Producto (15, "Gabinete", 275 , "image/gabinete.jpg");



const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15];


let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById ("contenedorProductos") ;


const mostrarProductos = () => {
    productos.forEach ((producto) => {
        const card = document.createElement("div");

        card.classList.add("col-xl-3", "col-md-6", "col-xs-12" );

        card.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
            <div class="card-body">
            <h5 class="card-title"> ${producto.nombre} </h5>
            <p class="card-text"> U$S ${producto.precio} </p>
            <button class="btn btn-success" id="boton${producto.id}"> Agregar al Carrito </button>
            </div>
        </div>
    `

    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id)
    })
    


    })
} 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        
        //agrego localStorage 
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}



mostrarProductos() ;

//Mostrar carrito compras

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Funcion para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-12", "col-md-12", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> U$S ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn btn-success" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
        
    })

    calcularTotal();
}


//Función elimina el producto del carrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos carrito de compra

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Función eliminar todo el carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage. 
    localStorage.clear();
}


const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");

setInterval( () => {
    fetch(criptoYa)
        .then( response => response.json())
        .then(({blue, ccb, ccl, mep, oficial, solidario}) => {
            divDolar.innerHTML= `
                <h2>Tipos de Dolar: </h2>
                <p> Dolar Oficial: ${oficial} </p>
                <p> Dolar Solidario: ${solidario} </p>
                <p> Dolar MEP: ${mep} </p>
                <p> Dolar CCL: ${ccl} </p>
                <p> Dolar CCB: ${ccb} </p>
                <p> Dolar Blue: ${blue} </p>
                `
        })
        .catch(error => console.error(error))
}, 2000)

const linkk = document.getElementById("linkk");

linkk.addEventListener("click", () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienda en Construcción :)',
        
      })
});

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: U$S ${totalCompra}`;
}