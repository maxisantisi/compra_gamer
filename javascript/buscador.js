

/*
const resultado = document.getElementById("resultado");

const formulario = document.getElementById("formulario");

const filtrar = () =>{

    resultado.innerHTML = '';
    
    const texto = formulario.value.toLowerCase();
    for ( let producto of productos ){
        let nombre = producto.nombre.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn btn-success" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        }

    }
    if ( resultado.innerHTML === '' ){
        resultado.innerHTML = `<li>Producto no encontrado</li>`
    }

}

formulario.addEventListener('keyup', filtrar)
filtrar();

*/