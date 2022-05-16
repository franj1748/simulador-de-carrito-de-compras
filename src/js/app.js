'use strict'

/**
* @fileoverview Simulación de módulo para agregar productos a un carrito de compras.
* @version 2.2
* @author Francisco Elis <https://github.com/franj1748>
* @copyright AccesoWeb 2022
*/
    
/**
 * Objeto que contiene toda la información del producto seleccionado. 
 * @typedef {object} Producto
 * @property {string} id - Id del producto.
 * @property {number} cantidad - Cuantos productos se han seleccionado.
 * @property {string} img - URL de la imagen del producto seleccionado.
 * @property {string} nombre - Nombre del producto.
 * @property {string} precio - Precio del producto seleccionado. 
*/


/**
 * Contenedor de toda la lista de los productos agregados al carrito.
 * @type {HTMLElement} 
 */
const carrito            = document.querySelector('#carrito');
/**
 * Contenedor de toda la lista de los productos en la página.
 * @type {HTMLElement} 
 */
const listaProductos     = document.querySelector('#productos');
/**
 * Tabla donde se genera el contenido dinámico del carrito.
 * @type {HTMLElement} 
 */
const contenedorCarrito  = document.querySelector('#lista-carrito tbody');
/**
 * Botón para vaciar el carrito.
 * @type {HTMLElement}
 */
const vaciarCarrito      = document.querySelector('#vaciar-carrito');
/**
 * Arreglo para agregar de forma dinámica los productos al carrito. 
 * @type {Array} 
 */
let   articulosAgregados = [];


// Eventos

// Cuando se agrega una producto al carrito presionando añadir al carrito. 
listaProductos.addEventListener('click', e => {

    // Si el objetivo del clic es el botón de agregar al carrito.
    if (e.target.classList.contains('add-bt')){
        // Se previene la acción por defecto del enlace. 
        e.preventDefault();
        /**
         * Elemento padre que contiene toda la información del producto.
         * @type {HTMLElement}
         */
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement;
        leerProducto(productoSeleccionado);
    }
});

// Cuando se elimina un producto del carrito. 
carrito.addEventListener('click', e => {

    // Si el objetivo del clic es el botón de eliminar producto del carrito.
    if (e.target.classList.contains('borrar-producto')){
        /**
         * Atributo de ID del producto seleccionado para eliminar. 
         * @type {string}
         */
        const productoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de productos por el 'data-id'.
        articulosAgregados = articulosAgregados.filter(producto => producto.id !== productoId);

        // Llama a la función que genera el HTML para que construya el carrito de nuevo sin el elemento que se elimino. 
        crearHtmlCarrito();
    }
    
});

// Cuando se presiona vaciar carrito. 
vaciarCarrito.addEventListener('click', e => {

    // Se reinicia el arreglo que contiene los productos. 
    articulosAgregados = [];
    // Se limpia el HTML. 
    crearHtmlCarrito();

});

// Funciones

/**
 * Crea un objeto con la información del producto seleccionado y lo agrega al array de artículos agregados.
 * @param {HTMLElement} producto Elemento padre que contiene toda la información del producto seleccionado.
 */
function leerProducto(producto){

    /**
     * @type {Producto}
     */
    const infoProducto = {
        id       : producto.querySelector('a').getAttribute('data-id'),
        cantidad : 1,
        img      : producto.querySelector('img').src,
        nombre   : producto.querySelector('.product_descr').textContent,
        precio   : producto.querySelector('.product_price').textContent,
    };
    
    // Verificar si el elemento a agregar ya existe en carrito. 
    const existe = articulosAgregados.some(producto => (producto.id === infoProducto.id));
    if (existe){
        const productos = articulosAgregados.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++
                return producto; // Se retorna el objeto actualizado. 
            } else {
                return producto; // Se retornan los objetos que no son duplicados pero permanecen en el carrito. 
            }
        });
        articulosAgregados = [...productos];
    } else {
        // Se cre una copia del array y se le agregan los elementos que se van generando. 
        articulosAgregados = [...articulosAgregados, infoProducto];
    }

    crearHtmlCarrito();
};

/**
 * Crea los elementos HTML que se agregaran al carrito, por cada elemento dentro del array de artículos.  
 */
function crearHtmlCarrito(){

    // Si existe un elemento HTML agregado al carrito, se limpia. 
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    
    articulosAgregados.forEach(producto => {
        const {img, nombre, precio, cantidad, id} = producto,
                row     = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${img}" style="width: 40px; height: 40px">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${id}" > X </a></td>
        `;
        contenedorCarrito.appendChild(row);
    });
};

