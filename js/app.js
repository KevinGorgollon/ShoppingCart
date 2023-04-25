//variables
const carrito = document.querySelector('#carrito');
const conetenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let = articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando el boton "agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina Cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // resetear el arreglo

        limpiarHTML(); //Eliminams todo el HTML
    })

}


// Cambio branch

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    // Si contiene agregar-carrito ejecutar el if
    if(e.target.classList.contains('agregar-carrito')) {
        // Guarda el lemento padre en este caso contenedor CARD
        const cursoSeleccionado = e.target.parentElement.parentElement
        // Llama a la funcion con el elemento padre
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del Carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    // Crear objeto con contenido del objeto actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    const cursoIndex = articulosCarrito.findIndex((curso) => curso.id === infoCurso.id)

    if(cursoIndex < 0) {
        articulosCarrito = [...articulosCarrito, infoCurso]
        return carritoHTML();
    }

    const cursoActualizado = { ...articulosCarrito[cursoIndex] }

    cursoActualizado.cantidad++

    articulosCarrito[cursoIndex] = cursoActualizado

    carritoHTML();
}


//Muestra el Carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y gerera el HTML
    articulosCarrito.forEach( (curso) => {
        // Aplicando Destructuring
        const { imagen, titulo, precio, cantidad, id } = curso;
        //Crear un table body
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            
        `;

        //Agrega el HTML del carrito en el tbody
        conetenedorCarrito.appendChild(row)
    });
}

// Elimina los crusos del tbody
function limpiarHTML() {
    //forma lenta
    // conetenedorCarrito.innerHTML = '';

    // .firstChild = si tiene almenos un elemento dentro el codigo se sigue ejecutando
    while(conetenedorCarrito.firstChild) {
        conetenedorCarrito.removeChild(conetenedorCarrito.firstChild);
    }
}