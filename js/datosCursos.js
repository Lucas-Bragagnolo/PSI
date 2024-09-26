// Array global para almacenar los cursos
let cursos = [];

// Función para cargar los cursos desde la API
const cargarCursos = async () => {
  try {
    const response = await fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=cursos');
    
    if (!response.ok) {
      throw new Error(`Error al cargar los cursos. Estado: ${response.status}`);
    }
    
    const data = await response.json();
    cursos = data;
    return cursos;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Función para renderizar los cursos
const renderizarCursos = async () => {
  const cursosData = await cargarCursos();
  const carousel = document.querySelector('.owl-carousel');
    
  // Limpiar el carrusel antes de agregar los nuevos ítems para evitar duplicados
  carousel.innerHTML = '';

  // Filtrar solo los cursos que sean de tipo "Ondemand"
  const cursosOndemand = cursos.filter(curso => curso.modalidad === '1');
  
  cursosOndemand.forEach(curso => {
    const item = document.createElement('div');  // Creación del div para el item del curso
    item.classList.add('item');  // Agregar la clase 'item'
    item.setAttribute('data-aos', 'zoom-in');  // Añadir atributo para animación
    let modalidadLetra = '';
    let estiloModalidad = '';
    if (curso.modalidad === '2') {
        modalidadLetra = 'Online en Vivo';
        estiloModalidad = 'tipoCursada';
    } else if (curso.modalidad === '1') {
        modalidadLetra = 'On Demand';
        estiloModalidad = 'tipoCursada2';
    } else  {
        modalidadLetra = 'Presencial';
    }
    // HTML que se inserta en el item
    item.innerHTML = `
      <div class="card">
          <img src="../img/${curso.imgportada}" class="card-img-top" alt="${curso.nombre}">
          <div class="card-body">
              <p class="${estiloModalidad}"><i class="fa-regular fa-dot"></i> ${modalidadLetra}</p>
              <p><i class="fa-solid fa-clock me-2"></i> ${curso.duracion2} Semanas / 1 clase Semanal</p>
              <p><i class="fa-regular fa-calendar me-2"></i> Inicio: ${curso.fechainicioletras}</p>
              <p class="card-text overflow-hidden" style="height: 4.5em;">${curso.descripcion2}</p>
              <h3 class="card-text"><strong>U$D ${curso.precio}</strong></h3>
              <a href="detalle_curso.html?planID=${curso.idPlan}" class="btn btn-primary">Ver Curso</a>
          </div>
      </div>
    `;
    
    carousel.appendChild(item); // Agregar el item al carrusel
  });

  // Destruir el carrusel si ya fue inicializado para evitar que se dupliquen los ítems
  $('.owl-carousel').trigger('destroy.owl.carousel');

  // Inicializar Owl Carousel nuevamente con los nuevos ítems
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1.3,
        center: true
      },
      600: {
        items: 3
      },
      1000: {
        items: 4.3
      }
    }
  });
  console.log('Renderizando cursos:', cursosData);
};

// Función para renderizar la tienda
const renderizarTienda = async () => {
  const cursosData = await cargarCursos();
  const cursosContainer = document.getElementById('cursos-container');
  let modalidadLetra = '';
  let estiloModalidad = '';
  cursosContainer.innerHTML = '';
  cursos.forEach(curso => {
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
          <div class="col">
          <a href="./detalle_curso.html?planID=${curso.idPlan}" class="text-decoration-none">
              <div class="card h-100 shadow-sm">
                  <img src="../img/${curso.imgportada}" class="card-img-top" alt="${curso.titulo}">
                  <div class="card-body">                        
                      
                      <p><i class="fa-solid fa-clock me-2"></i> ${curso.duracion2} Semanas / 1 clase Semanal</p>
                      <p><i class="fa-regular fa-calendar me-2"></i>${curso.fechainicioletras}</p>
                      <h2 class=""><strong>U$D ${curso.precio}</strong></h2>

                      </p>                      
                  </div>
              </div>
        </a>
        </div>
      `;
      cursosContainer.innerHTML += cursoHTML;
  });
  console.log('Renderizando tienda:', cursosData);
};

// Llamar a las funciones por separado
renderizarCursos();
renderizarTienda();
