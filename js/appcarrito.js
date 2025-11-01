//const listaProductos = document.querySelector('.lista-productos');
const miCarrito = document.querySelector('#el-carrito');
const listaProductos = document.querySelector('#lista-productos');
const miSubtotal = document.querySelector('#mi-subtotal');
const miEnvio = document.querySelector(' #mi-envio');
const miTotal = document.querySelector('#mi-total');

let carritoCompras = [];
cargarEventos();

//Definir los eventos
function cargarEventos(){
    //Definir un evento para el area donde estan los productos
    //listaProductos.addEventListener('click', agregarProducto);
    //Evento cuando el DOM fue cargado
    document.addEventListener('DOMContentLoaded', () => {
        carritoCompras = JSON.parse(localStorage.getItem('carrutiWeb')) || [];
        //Renderiza el carrito
        dibujaElementosCarrito();
        //Renderizar el numero 
        NumeroCarrito();

        //Renderizar los renglones de la tabla
        dibujaElementosTabla();
    })
}


//Funcion que incerta los productos a la tabla
function dibujaElementosTabla(){
    while(listaProductos.firstChild)
       listaProductos.removeChild(listaProductos.firstChild);
    let totalCompra = 0;
    carritoCompras.forEach( producto => {
        
       producto.precio = producto.precio.replace('$','');
       let subTotalProducto = parseFloat(producto.precio) * producto.cantidad;
       totalCompra += subTotalProducto;
       const ElementoTR = document.createElement('tr');
       ElementoTR.setAttribute('class', "alert");
       ElementoTR.setAttribute('role', "alert");
       ElementoTR.innerHTML = `<td>
                                <!--<label class="checkbox-wrap checkbox-primary">
                                        <input type="checkbox" checked>
                                        <span class="checkmark"></span>
                                </label>-->
                                </td>
                                <td>
                                    <div class="img"> <img src=${producto.imagen} alt="" width="120px" height="120px"></div>
                                </td>
                                <td>
                                    <div class="email">
                                        <span>${producto.nombre}</span>
                                        <span> </span>
                                    </div>
                                </td>
                                <td class="quantity">
                                    <div class="input-group">
                                        <input type="text" name="quantity" class="quantity cantidad form-control input-number" id="talla" value=${producto.talla} min="22" max="26" onchange="ShowSelected(${producto.id});">
                                    </div>
                                </td>
                                <td >
                                <div class="input-group min="1" max="100"">
                                   
                                    ${formatoMoneda(parseFloat(producto.precio))}
                                </div>
                                </td>
                                <td class="quantity">
                                    <div class="input-group">
                                        <input type="text" name="quantity" class="quantity cantidad form-control input-number" value=${producto.cantidad} min="1" max="100" readonly>
                                    </div>
                                </td>
                                <td>${formatoMoneda(subTotalProducto)}</td>
                                <td>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="eliminarproducto(${producto.id});">
                                    <span aria-hidden="true">  
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffbf00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </span>
                                </button>
                                </td>`;
        listaProductos.appendChild(ElementoTR);
        
       
   });
   realizaCalculos();
}


function ShowSelected(id)
{
    var cod=0;
        cod = document.getElementById("talla").value;   
        carritoCompras.forEach( producto => {
            if(id==producto.id)
                if(cod<22)
                    alert("La talla debe estar en el rango 22-26")
                else
                   if(cod>26)
                    alert("La talla debe estar en el rango 22-26")
                    else
                    {
                        producto.talla = cod;
                        localStorage.setItem('talla', producto.talla)
                    } 
        });
        
}

//Funcion que realiza los calculos
function realizaCalculos(){

    let totalCompra = 0;
    let totalEnvio = 0;
    let granTotal = 0;
    carritoCompras.forEach( producto => {
       producto.precio = producto.precio.replace('$','');
       let subTotalProducto = parseFloat(producto.precio) * producto.cantidad;
       totalCompra += subTotalProducto;
    });
    if(carritoCompras.length==0)
        totalEnvio =0;
    else
        if( totalCompra < 2000)
            totalEnvio = 50;

    granTotal = parseFloat(totalCompra) + parseFloat(totalEnvio);
    //Renderizar el total de la compra, total envio y el Gran total
   miSubtotal.textContent = formatoMoneda(totalCompra);
   miEnvio.textContent = formatoMoneda(totalEnvio);
   miTotal.textContent = formatoMoneda(granTotal);

}

//Funcion para eliminar el producto del carrito
function eliminarproducto(idProducto){
    //alert("Desde eliminar producto" + idProducto);
    //Filtrar los productos que SU deseamos
    carritoCompras = carritoCompras.filter( producto => producto.id != idProducto);
    //Renderizar los elementos del carrito parte superior derecha
    dibujaElementosCarrito();

    //Renderizar los renglones de la tabla
    dibujaElementosTabla();

    //Realiza calculos
    realizaCalculos();
}
// Funcion para dar formato a numeros

function formatoMoneda(cantidad) {
    let valor = (cantidad).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });
    return valor;
}

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
