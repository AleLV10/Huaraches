const listaProductos = document.querySelector('.lista-productos'); //Apunta hacía los productos
const miCarrito = document.querySelector('#el-carrito'); //Apunta a donde van a mostrarse los productos

let carritoCompras = [];

cargarEventos();

//Definir los eventos
function cargarEventos(){
    listaProductos.addEventListener('click', agregarProducto);
    //Evento cuando el DOM fue cargado
    document.addEventListener('DOMContentLoaded', () => {
        carritoCompras = JSON.parse(localStorage.getItem('carrutiWeb')) || [];
        //Renderiza el carrito
        dibujaElementosCarrito();
        //Renderizar el numero 
        NumeroCarrito();
    })
}

function agregarProducto(evento){
    evento.preventDefault();
   if(evento.target.classList.contains('agregar-carrito')){
       const producto = evento.target.parentElement.parentElement.parentElement;
       obtengaDatosProducto(producto);
   }
}
  

function obtengaDatosProducto(producto){
    infoProducto = {
        imagen: producto.querySelector('img').getAttribute('src'),
        nombre: producto.querySelector('.info-producto .nom').textContent,
        precio: producto.querySelector('.info-producto .precio' ).textContent,
        cantidad: 1,
        talla: 22,
        id: producto.querySelector('div .agregar-carrito').getAttribute('data-id'),  
    }

    const existe = carritoCompras.some(producto => producto.id === infoProducto.id);
    if(existe){
        const copiaCarrito = carritoCompras.map( producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }
            else
                return producto;
        });
        carritoCompras = [...copiaCarrito];
    }
    else
      carritoCompras.push(infoProducto);
    console.log(carritoCompras);

    dibujaElementosCarrito();

}

//La funcion crea los elementos HTML y los renderiza en pantalla
function dibujaElementosCarrito(){
    limpiarHTML();
    carritoCompras.forEach(producto => {
        const divHTML= document.createElement('div'); //Se crea una etiqueta HTML llamada div
        divHTML.innerHTML= `<div class="dropdown-item d-flex align-items-start m-1 col">
                                <div class="img col-lg-2 mx-3 mt-3"> <img src=${producto.imagen} alt="" width="80px"></div>
                                <div class="text col-lg-10 mx-5 mt-4">
                                    <p>${producto.nombre} </p>
                                    <p class="mb-3">
                                        <span class="quantity ">Talla: ${producto.talla} </span>
                                        <span class="mx-5 quantity ">Cantidad: ${producto.cantidad} </span>
                                    </p>
                                    <a class=" price text-center"> ${producto.precio} </a>
                                </div>
                            </div>`;
        miCarrito.appendChild(divHTML);
    });

    //Renderizar el botton ver carrito
    miCarrito.appendChild(btnVerCarrito());
    // Guardar el carrito en localStoral
    sincronizarLocalStorage();
    //Actualiza/renderiza el numero de productos
    NumeroCarrito();
}

//Sincronizar LocalStorage //Funcuin que guarda
function sincronizarLocalStorage(){
    localStorage.setItem('carrutiWeb', JSON.stringify(carritoCompras));
}

//Funcion para limpiar el carrito de HTML
function limpiarHTML(){
    while(miCarrito.firstChild)
        miCarrito.removeChild(miCarrito.firstChild);
}


//Funcion que cree el bitin btnVerCarrito
function btnVerCarrito(){

    const elementoA = document.createElement('a');
    elementoA.setAttribute('class', "btn-prod text-dark dropdown-item text-center d-block  w-100");
    elementoA.setAttribute('href', "micarrito.html");
    elementoA.textContent = "Ver carrito";

    const elementoSPAN = document.createElement('span');
    elementoSPAN.setAttribute('class', "ion-ios-arrow-round-forward");

    elementoA.appendChild(elementoSPAN);
    return elementoA;
}
 
//Funcion que reenderiza el numero de profuctos que se encuentran en el carrito
function NumeroCarrito(){
    document.querySelector('#numerito').textContent = carritoCompras.length;
}


