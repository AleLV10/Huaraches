
//Hacer un arreglo con todos los productos
let misProductos = [];

let ban;

const pintarResultados = document.querySelector('#resultados-busqueda');


function ObtenerProductos(){
    //Apuntar hacía al contenedor de los productos
    const listaCompletaProductos = document.querySelector('.lista-productos');
    //Un producto es un hijo de listaCompletaProductos  
    while(listaCompletaProductos.hasChildNodes)
    {
        const producto = listaCompletaProductos.firstElementChild;
        try{
            obtengaDatosProductosTodos(producto);
            listaCompletaProductos.removeChild(listaCompletaProductos.firstElementChild);
        }
        catch(IOException){
            break;
        }
    } 
    //obtengaDatosProducto(producto);
    //Funcion llamar a buscar
    buscar();
}

function obtengaDatosProductosTodos(producto){
    infoProducto = {
        imagen: producto.querySelector('img').getAttribute('src'),
       // imagen: document.getElementById("img-pro").getAttribute('src'),
        nombre: producto.querySelector('.info-producto .nom').textContent,
        precio: producto.querySelector('.info-producto .precio' ).textContent,
        cantidad: 1,
        talla: 25,
        id: producto.querySelector('div .agregar-carrito').getAttribute('data-id'),
        
    }
    //console.log(infoProducto);
    //preguntar si ya existe el producto en el carrito
    const existe = misProductos.some(producto => producto.id === infoProducto.id);
    if(existe){
        const copiaCarrito = misProductos.map( producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }
            else
                return producto;
        });
        misProductos = [...copiaCarrito];
    }
    else
      misProductos.push(infoProducto);
    //console.log(misProductos);
}

const botonBuscar = document.querySelector('.barra-buscadora a')

function buscar(){
    //botonBuscar.setAttribute('href','busqueda.html');
    ban=true;
    while(misProductos.firstChild)
                misProductos.removeChild(misProductos.firstChild);
    while(listaProductos.firstChild)
            listaProductos.removeChild(listaProductos.firstChild);
    let paginaActual = location.href;
    console.log(paginaActual);
    console.log(misProductos);
    let filtro = document.querySelector('.buscar').value+"";
    filtro = filtro.toUpperCase();
    console.log(filtro);
    misProductos.forEach(producto => {
        if(producto.nombre.toUpperCase().includes(filtro))
        {
            const divHTMLB= document.createElement('div'); //Se crea una etiqueta HTML
            divHTMLB.setAttribute('class','c col-lg-3 col-md-4 col-sm-6 col-xs-12')
            divHTMLB.innerHTML= `<div class="card shadow-sm"> <a href="detalle-producto.html" ><img  src="${producto.imagen}" class="card-img-top" alt="..."> </a> 
                    <div class="card-sl">
                        <h5 class="card-title text-center">${producto.nombre} </h5>
                        <h5 class="card-heading">${producto.precio}</h5>
                        <div class="text-center my-4"> <a href="detalle-producto.html" class="btn ">Comprar</a> </div>
                    </div>
                </div>`;
            listaProductos.appendChild(divHTMLB);
            ban=false;
            //alert(pintarResultados);
        }
        //botonBuscar.setAttribute('href','busqueda.html');
    });
    if(ban)
    {
        const mensajeHTML = document.createElement('div');
        mensajeHTML.innerHTML = `
            <h1 class="mt-5 mb-5"> <br><br>El producto no existe <br><br><br></h1> `
        listaProductos.appendChild(mensajeHTML);
    }
}

