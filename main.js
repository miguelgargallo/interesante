// variables
let dominios = [];
const nombreDominio = document.querySelector('#nombre-dominio');
const botonComprar = document.querySelector('#btn-comprar');
const cuadroListado = document.querySelector('#m-datos');
const listadoDominios = document.querySelector('#listado');
let precioMensual = document.querySelector('#costo-mensual');
let precioAnual = document.querySelector('#costo-anual');
const precio = 0.82;
const meses = 12;
let anual = 0;
let mes = 0;
const claseExiste = 'alerta';

// funciones
// verificacion de datos
function verificar(dominio) {
    return dominios.includes(dominio);
};

function comprobarDominioLibre () {
     // Si esta presente, muestro un color de alarma
     if (verificar(nombreDominio.value)) {
         // Anyado una clase
         nombreDominio.classList.add(claseExiste);
     } else {
         // Quito la clase
         nombreDominio.classList.remove(claseExiste);
     }

 };

 function comprarDominio () {
    //  una vez verificado que el dominio no se encuentra en el array procedemos a ingresarlo pero ponemos la condicional de que solo aceptamos 5 dominios asi evitamos el ingreso de mas numeros
     if (verificar(nombreDominio.value) == false && dominios.length < 5) {
        //  cambiamos la clase del container
        cuadroListado.style.display = 'flex';
         // Anyadimos el dominio
        dominios.push(nombreDominio.value);
         // Borramos el contenido del input
        nombreDominio.value = '';
        // una vez lleguemos al limite alertamos al usuario de que a llegao a su limite
     } else if (dominios.length === 5) {
         alert('Has llegado al Limite de Compra de Dominios');
     }
     // Rerenderizamos
     renderizar();
 };

 function renderizar () {
     // Lista de dominios comprados
     listadoDominios.textContent = '';
    //  ingresar los datos al html luego de la verificacion
     if (verificar(nombreDominio.value) == false) {
     dominios.forEach(function (dominio) {
        //  mostramos el costo mensual y anual basado en el tamaño del array, haciendo el calculo
        precioAnual.textContent = ''.concat(dominios.length * meses * precio, '€');
        precioMensual.textContent = ''.concat(dominios.length * precio, '€');
        // insertamos el bloque de html para mostrar los enlaces adquiridos
        listadoDominios.innerHTML +=
        `<div id="lista" class="grupo">
            <div class="linkInfo">
                <p class="infoWeb">${dominio}</p>
                <span class="precio">${precio}&euro;</span>
            </div>
            <button class="cerrar" onclick="delLink('${dominio}')">x</button>
        </div>`
     });
    }
 }

 function delLink (dominio) {
    //  filtramos los enlaces y realizamos una copia en otro array del enlace que no queremos ver asi el enlace principal ya no lo muestra
     dominios = dominios.filter(function (item) {
         return item !== dominio;
     });
    //  cuando el array llegue a cero borramos el cuadro donde se muestran los montos a pagar
     if(dominios.length === 0) {
        cuadroListado.style.display = 'none';
     }
     renderizar();
}


//  eventos
nombreDominio.addEventListener('input', comprobarDominioLibre);
botonComprar.addEventListener('click', comprarDominio);
