let usuario = [];

cargarEventos();

//Definir los eventos
function cargarEventos(){
    document.addEventListener('DOMContentLoaded', () => {
        usuario = JSON.parse(localStorage.getItem('usuarios')) || [];
    });
}

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  

function obtengaDatosUsuario(){
    let valor =""
    if( document.querySelector('.registrar-cont #hombre').checked)
        valor="Hombre"
    else
        valor = "Mujer"
    infoUsuario = {
        nombre: document.querySelector('.registrar-cont .nombre').value,
        fecha: document.querySelector('.registrar-cont .fecha-nacimiento').value,
        sexo: valor,
        correo: document.querySelector('.registrar-cont .correo').value,
        contrasena: document.querySelector('.registrar-cont .contrasena').value,
    }

    if (infoUsuario.nombre != "")
    {
        if (infoUsuario.fecha != "")
        {
            if (infoUsuario.sexo != "")
            {
                if (infoUsuario.correo != "" && emailRegex.test(infoUsuario.correo)){
                    if (infoUsuario.contrasena.length >= 8)
                    {
                        if (document.querySelector('.casilla .aceptar').checked)
                        {
                            //preguntar si ya existe el correo registrado

                            const existe = usuario.some(usuarios => usuarios.correo === infoUsuario.correo);
                            if (existe){
                                alert("YA EXISTE UNA CUENTA CON ESE USUARIO");
                            }
                            else{
                                usuario.push(infoUsuario);
                                console.log(usuario);
                                sincronizarLocalStor();
                                alert("CUENTA CREADA CON ÉXITO");
                                
                                location.href="iniciarsesion.html";
                            }
                        }
                        else
                            alert("DEBES ACEPTAR LOS TÉRMINOS Y CONDICIONES");
                    }
                    else
                        alert("LA CONTRASEÑA DEBE CONTENER MÁS DE 8 CARACTERES")
                }
                else
                    alert("CORREO NO VÁLIDO");
            }
            else
                alert("DEBE SELECCIONAR UN SEXO");
        }
        else
            alert("LA FECHA DE NACIMIENTO NO PUEDE QUEDAR VACÍA");
    }
    else
        alert("EL NOMBRE DE USUARIO NO PUEDE QUEDAR VACÍO");

   
}

function iniciarSesion(){
    if (document.querySelector('.sesion .aceptarS').checked)
    {
        const existe = usuario.some(usuarios => (usuarios.correo === document.querySelector('.sesion .correo').value));
        if (existe){
            document.querySelector(".sesion .contrasena").value = usuario.contrasena;
            location.href="index.html";
            alert("SESIÓN INICIADA");
        }
        else
            alert("NO EXISTE ESTE USUARIO");
    }
    else
    { 
        const existe = usuario.some(usuarios => (usuarios.correo === document.querySelector('.sesion .correo').value) && (usuarios.contrasena === document.querySelector('.sesion .contrasena').value));
        if (existe){
            location.href="index.html";
            alert("SESIÓN INICIADA");
        }
        else
            alert("USUARIO O CONTRASEÑA INCORRECTA");    
    }
}

function sincronizarLocalStor(){
    localStorage.setItem('usuarios', JSON.stringify(usuario));
}
