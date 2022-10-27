class Producto {
    constructor (id,nombre,precio,img){
        this.id = id ;
        this.nombre = nombre ;
        this.precio = precio ;
        this.img = img ;
        this.cantidad = 1 ;
    }
}

const producto1 = new Producto (1, "sahumerios", 100 , "image/sahumerio1.jpg");
const producto2 = new Producto (2, "Caja Buda", 100 , "image/cajaBuda.jpg");
const producto3 = new Producto (3, "Caja Mate", 100 , "image/cajaMate.jpg");
const producto4 = new Producto (4, "Caja Mate", 100 , "image/cajaMate2.jpg");
const producto5 = new Producto (5, "Caja Mate", 100 , "image/cajaMate3.jpg");
const producto6 = new Producto (6, "Cascada", 100 , "image/cascada1.jpg");
const producto7 = new Producto (7, "Cascadas", 100 , "image/cascada2.jpg");
const producto8 = new Producto (8, "Humadero", 100 , "image/humadero.jpg");
const producto9 = new Producto (9, "Incienso", 100 , "image/incienso.jpg");
const producto10 = new Producto (10, "Jarron", 100 , "image/jarron.jpg");
const producto11 = new Producto (11, "Combo Mate", 100 , "image/mate1.jpg");
const producto12 = new Producto (12, "Combo Mate 2", 100 , "image/mate2.jpg");
const producto13 = new Producto (13, "Combo Mate 3", 100 , "image/mate3.jpg");
const producto14 = new Producto (14, "Combo Mate 4", 100 , "image/mate4.jpg");
const producto15 = new Producto (15, "Vela", 100 , "image/vela.jpg");
const producto16 = new Producto (16, "Velas", 100 , "image/velas.jpg");
const producto17 = new Producto (17, "Vela y Flor", 100 , "image/velayflor.jpg");


const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16];


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
            <p class="card-text"> ${producto.precio} </p>
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
                <p class="card-text"> ${producto.precio} </p>
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




