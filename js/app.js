// variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');

// event Listener

eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Boton de reset
     btnReset.addEventListener('click', resetearFormulario);
     
     // Boton de enviar en el submit
     formulario.addEventListener('submit', enviarEmail);

   
}



// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


// Valida que el campo tengo algo escrito

function validarFormulario(e) {
    
     if(e.target.value.length > 0 ) {

          //Elimina los errores
          const error = document.querySelector('p.error');
          if(error){
               error.remove();
          }
          e.target.classList.remove('border', 'border-red-500');
          e.target.classList.add('border', 'border-green-500');
     } else {
          e.target.classList.remove('border', 'border-green-500');
          e.target.classList.add('border', 'border-red-500');

          mostrarError("Todos los campos son obligatorios");
     }
     //validar el email, esta no es la mejor validacion
     if(e.target.type === 'email') {

          
          
          if(er.test( e.target.value)){   //e.target hace referencia al campo actual
               const error = document.querySelector('p.error');
               if(error){
                    error.remove();
               }
     
               e.target.classList.remove('border', 'border-red-500');
               e.target.classList.add('border', 'border-green-500');
         } else{
               e.target.classList.remove('border', 'border-green-500');
               e.target.classList.add('border', 'border-red-500');
               mostrarError("Email no valido");
         }
     }
     
     if( er.test (email.value) && asunto.value !== '' && mensaje.value !== '' ) {
          btnEnviar.disabled = false;
          btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
        } 

}
     function mostrarError(mensaje){
          const mensajeError= document.createElement('p');
          mensajeError.textContent = mensaje;
          mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
          const errores = document.querySelectorAll('.error'); //esto quiere decir que selecciona solamente un error, no se quiere mas
          if(errores.length === 0) {  //.lenght nada mas existe un queryselectorAll. Cuando un elemento no existe en queryselctor se retorna null
               formulario.appendChild(mensajeError);
          }


     }

// Cuando se envia el correo
function enviarEmail(e) {
     e.preventDefault();

     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     //Despues de tres segundos ocultar
     setTimeout( () => {
          spinner.style.display = 'none';

          //Mensaje que dice que se envio correctamente

          const parrafo = document.createElement('p');
          parrafo.textContent = 'Mensaje Enviado Correctamente';
          parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
         
          //Inserta el mensaje despues del spinner 
          formulario.insertBefore(parrafo, spinner);
          
          setTimeout( () => {
               parrafo.remove(); //elimina el mensaje de enviado con exito
         
               resetearFormulario();
          }, 5000);
          }, 3000 );
          }

     
// Resetear el formulario 
function resetearFormulario(e) {
     e.preventDefault();
     formulario.reset();


     inicioApp();
}





function validarEmail(campo) {
     const mensaje = campo.value;

     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
     if( re.test(mensaje.toLowerCase()) ) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
     } else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
     }
}