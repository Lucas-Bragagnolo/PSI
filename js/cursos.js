// Función para generar los botones de radio de categorías
function generarRadiosAreas() {
  const contenedorRadios = document.getElementById('filtroAreaRadios');
  contenedorRadios.innerHTML = '';

  // Opción para "Todas" las áreas
  const radioTodas = document.createElement('div');
  radioTodas.innerHTML = `
    <input type="radio" id="areaTodas" name="area" value="" checked onchange="aplicarFiltros()" />
    <label for="areaTodas">Todas</label>
  `;
  contenedorRadios.appendChild(radioTodas);

  // Crear un botón de radio por cada área cargada
  areas.forEach(({ id, descripcion}) => {
    const radio = document.createElement('div');
    radio.innerHTML = `
      <input type="radio" id="area${id}" class="mb-2" name="area" value="${id}" onchange="aplicarFiltros()" />
      <label for="area${id}">${descripcion}</label>
    `;
    contenedorRadios.appendChild(radio);
  });
}

// Agregar event listener para el filtro de nombre
document.getElementById('filtroNombre').addEventListener('input', aplicarFiltros);

// Función para aplicar los filtros de Cursos
function aplicarFiltros() {
  const filtroAreaId = document.querySelector('input[name="area"]:checked').value;
  const filtroPrecioMin = parseFloat(document.getElementById('precioMin').value) || 0;
  const filtroPrecioMax = parseFloat(document.getElementById('precioMax').value) || Infinity;
  const filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
  const filtroTipoCurso = document.querySelector('input[name="tipoCurso"]:checked').value;
  const filtroModalidad = document.querySelector('input[name="modalidad"]:checked').value;

  // Guardar los filtros en sessionStorage
  sessionStorage.setItem('filtroAreaId', filtroAreaId);
  sessionStorage.setItem('filtroPrecioMin', filtroPrecioMin);
  sessionStorage.setItem('filtroPrecioMax', filtroPrecioMax);
  sessionStorage.setItem('filtroNombre', filtroNombre);
  sessionStorage.setItem('filtroTipoCurso', filtroTipoCurso);
  sessionStorage.setItem('filtroModalidad', filtroModalidad);

  const cursosFiltrados = cursos.filter(curso => {
    const coincideArea = filtroAreaId === '' || curso.area == filtroAreaId;
    const coincidePrecio = curso.precio >= filtroPrecioMin && curso.precio <= filtroPrecioMax;
    const coincideNombre = curso.nombre.toLowerCase().includes(filtroNombre);
    const coincideTipoCurso = filtroTipoCurso == '0' || curso.tipocurso == filtroTipoCurso;
    const coincideModalidad = filtroModalidad == '0' || curso.modalidad == filtroModalidad;    

    return coincideArea && coincidePrecio && coincideNombre && coincideTipoCurso && coincideModalidad;
  });
  mostrarCursos(cursosFiltrados);
}

// Función para actualizar el valor mínimo del precio
function actualizarPrecioMin() {
  const precioMin = document.getElementById('precioMin').value;
  document.getElementById('precioMinValor').textContent = precioMin;
  aplicarFiltros();
}

// Función para actualizar el valor máximo del precio
function actualizarPrecioMax() {
  const precioMax = document.getElementById('precioMax').value;
  document.getElementById('precioMax').textContent = precioMax;
  aplicarFiltros();
}

// Función para filtrar los cursos por modalidad
function filtrarPorModalidad(modalidad) {
  console.log('Iniciando filtrarPorModalidad');  
  const cursosFiltrados = cursos.filter(curso => {
    console.log('Evaluando curso:', curso.nombre);    
    const coincideModalidad = modalidad === '' || curso.modalidad === modalidad;
    console.log('¿Coincide modalidad?', coincideModalidad);    
    return coincideModalidad;
  });
  
  mostrarCursos(cursosFiltrados);
}

// Función para mostrar los Cursos filtrados
function mostrarCursos(cursosFiltrados) {
  const cursosContainer = document.getElementById('cursos-container');
  let modalidadLetra = '';
  let estiloModalidad = '';
  cursosContainer.innerHTML = '';
  cursosFiltrados.forEach(curso => {
      if (curso.modalidad === '2') {
          modalidadLetra = 'Online en Vivo';
          estiloModalidad = 'tipoCursada';
      } else if (curso.modalidad === '1') {
          modalidadLetra = 'On Demand';
          estiloModalidad = 'tipoCursada2';
      } else  {
          modalidadLetra = 'Presencial';
      }
      const cursoHTML = `
          <div class="col curso">
          <a href="./detalle_curso.html?planID=${curso.idPlan}" class="text-decoration-none">
              <div class="card h-100 shadow-sm">
                  <img src="../img/${curso.imgportada}" class="card-img-top" alt="${curso.titulo}">
                  <div class="card-body">                        
                      
                      <p><i class="fa-solid fa-clock me-2"></i>Duracion  <strong>${curso.duracion2} semanas</strong> </p>
                      <p><i class="fa-regular fa-calendar me-2"></i>Inicio <strong>${curso.fechainicioletras}</strong></p>
                      <h2 class=""><strong>U$D ${curso.precio}</strong></h2>

                      </p>                      
                  </div>
              </div>
        </a>
        </div>
      `;
      cursosContainer.innerHTML += cursoHTML;
  });
}

// Llamada inicial para cargar Cursos y categorías cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
  await cargarCursos();  // Cargar Cursos de forma asíncrona
  await cargarAreas(); // Cargar categorías de forma asíncrona  
  // Generar radios de categorías y mostrar todos los Cursos
  generarRadiosAreas();
  
  // Recuperar los filtros del sessionStorage
  const filtroAreaId = sessionStorage.getItem('filtroAreaId') || '';
  const filtroPrecioMin = sessionStorage.getItem('filtroPrecioMin') || 0;
  const filtroPrecioMax = sessionStorage.getItem('filtroPrecioMax') || Infinity;
  const filtroNombre = sessionStorage.getItem('filtroNombre') || '';
  const filtroTipoCurso = sessionStorage.getItem('filtroTipoCurso') || '0';
  const filtroModalidad = sessionStorage.getItem('filtroModalidad') || '0';

  // Aplicar los filtros recuperados
  document.querySelector(`input[name="area"][value="${filtroAreaId}"]`).checked = true;
  document.getElementById('precioMin').value = filtroPrecioMin;
  document.getElementById('precioMax').value = filtroPrecioMax;
  document.getElementById('filtroNombre').value = filtroNombre;
  document.querySelector(`input[name="tipoCurso"][value="${filtroTipoCurso}"]`).checked = true;
  document.querySelector(`input[name="modalidad"][value="${filtroModalidad}"]`).checked = true;

  // Aplicar los filtros
  aplicarFiltros();
});
