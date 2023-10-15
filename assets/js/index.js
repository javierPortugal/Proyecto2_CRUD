console.log("Entro index.js");

let libros = JSON.parse(localStorage.getItem("libros")) || [];

//referencia a los inputs
//************************* */

const inputTitulo = document.getElementById("inputTitulo");
const inputEdicion = document.getElementById("inputEdicion");
const inputArea = document.getElementById("inputArea");
const inputImagen = document.getElementById("inputImagen");
const inputResumen = document.getElementById("inputResumen");

//Refrencia a los botones
//************************** */

const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divLibros = document.getElementById("divLibros");
const alertSinLibros = document.getElementById("alertSinLibros");

let indexEditar = null;


/******Definicion de clase  */
class Libro{
    constructor(titulo, edicion, area, imagen, resumen){
        this.titulo = titulo;
        this.edicion = edicion;
        this.area = area;
        this.imagen = imagen;
        this.resumen = resumen;
    }
}


//******         */
//****** funciones */
function guardarLibro(){
    let titulo = inputTitulo.value;
    let edicion = inputEdicion.value;
    let area = inputArea.value;
    let imagen = inputImagen.value;
    let resumen = inputResumen.value;

    let libro = new Libro(
        titulo,
        edicion,
        area,
        imagen,
        resumen
    ) ;
   /* console.log(titulo,edicion,area,imagen,resumen);*/

    console.log(libro);

    if(indexEditar== null){
        console.log("agregar libro POR NULL");
        libros.push(libro);

    }else{
        console.log("editar libro");
    }

    localStorage.setItem("libros", JSON.stringify(libros));
    console.log("Entro a FUNCION guardar libro");

    mostrarLibros();
    


}

function borrarTodo(){
    console.log("Entro a borrar todo");
    localStorage.clear();
    libros = [];
    mostrarLibros();
    alert("Se borraron los libros");


}

function eliminarLibro(index) {
    console.log(index);
    libros.splice(index, 1);
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros();
    alert("Libro eliminado");
}

function editarLibro(index) {
    indexEditar = index;
    let libroAEditar = libros[index];
    inputTitulo.value = libroAEditar.titulo;
    inputEdicion.value = libroAEditar.edicion;
    inputArea.value = libroAEditar.area;
    inputImagen.value = libroAEditar.imagen;
    inputResumen.value = libroAEditar.resumen;
}



function mostrarLibros() {
    if (libros.length === 0) {
        divLibros.innerHTML = `
        <div class="alert alert-danger" role="alert" id="alertSinLibros">
            No hay libros agregados
        </div>`;
    } else {
        divLibros.innerHTML = "";
        libros.forEach((libro, index) => {
            divLibros.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${libro.imagen}" class="img-fluid rounded-start" alt="libro">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${libro.edicion} - ${libro.area}</h6>
                            <p class="card-text">${libro.resumen}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarLibro(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarLibro(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}


//**** Event Listener */
//*******             */

btnAgregar.addEventListener("click", guardarLibro);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarLibros();



