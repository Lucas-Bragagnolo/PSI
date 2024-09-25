// Función para obtener el valor de un parámetro en la URL
const obtenerParametroURL = (parametro) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro); // Retorna el valor del parámetro pasado
};

// Obtener el valor del parámetro "cursoID"
const planID = obtenerParametroURL('planID');
console.log('planID obtenido de la URL:', planID);


//funcion para mostrar el banner del curso
const mostrarBannerCurso = (curso) => {
    const bannerCurso = document.querySelector('.banner-curso');
    if (!bannerCurso) {
        console.error('Banner del curso no encontrado');
        return;
    }
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

    let tipoCurso = '';
    if (curso.tipocurso === '1') {
        tipoCurso = 'Curso';
    } else if (curso.tipocurso === '2') {
        tipoCurso = 'Especialización';
    }
    // Estructura HTML para el banner del curso
    bannerCurso.innerHTML = `
        <section style="background-image: url('../img/${curso.imgbanner}'); background-size: cover; display: flex; align-items: center;">
        <div class="container">
            <div class="row justify-content-center blur">
                <div class="col-lg-10 col-md-12">
                    <div class="text-white p-4 rounded text-center">
                        <h3 class="rounded-pill bg-info text-white text-center d-inline-block px-3 mb-3">${tipoCurso}</h3>
                        <h1 class="display-4 mb-3">${curso.nombre}</h1>
                        <p class="lead mb-4 w-auto"><i class="fas fa-clock me-2 "></i>Duración: ${curso.duracion2} Semanas</p>

                        <p class="rounded-pill ${estiloModalidad} text-center d-inline-block px-2 mb-3" style="width: fit-content;"><i class="fa-regular fa-dot"></i>${modalidadLetra}</p>
                        <div class="mt-4 d-flex flex-wrap justify-content-center">
                        <a href="#inscripcion" class="btn btn-primary">Inscribirse ahora</a>
                        <a href="#contenidos" class="btn btn-success">Ver contenidos</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
    // Mostrar el banner del curso
}

// Función para mostrar los detalles de un curso
const mostrarDetalleCurso = (curso) => {
    const contenedor = document.querySelector('.detalle-curso');
    
    if (!contenedor) {
        console.error('Contenedor para detalles del curso no encontrado');
        return;
    }

    // Estructura HTML para el detalle del curso
    contenedor.innerHTML = `
        <section>
            <div class="container mt-3">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- Resumen del curso -->
                        <section class="mb-5">
                            <h2 class="h3 mb-3">${curso.nombre}</h2>
                            <p class="lead">${curso.descripcion1}</p>
                            <p>${curso.descripcion2}</p>
                        </section>
                        
                        <!-- Acceso al curso -->
                        <section class="mb-5">
                            <h2 class="h3 mb-3">Acceso al Curso</h2>
                            <p>Una vez abonado el acceso es automático y llegará al e-mail ingresado al momento de su inscripción. Junto al acceso se enviarán un video de bienvenida y tutoriales de cómo acceder y manejarse en el campus.</p>
                            <p class="fw-bold">Al finalizar el estudio de los capítulos y anexos, se realiza un examen multiple choice que deberá ser aprobado para recibir la certificación.</p>
                            <p>Tras la certificación, el alumno mantendrá acceso al material, actualizaciones gratuitas, una Biblioteca virtual de psicología, la COMUNIDAD PSI y descuentos en futuras formaciones y promociones.</p>
                        </section>
                        
                        <!-- Contenidos -->
                        <section class="mb-5" id="contenidos">
                            <h2 class="h3 mb-3">Temario Desarrollado</h2>
                            <div class="accordion" id="accordionTemario">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                           ${curso.nombre}
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionTemario">
                                        <div class="accordion-body">
                                            <ul class="list-group list-group-flush" id="listaTemas">
                                                <!-- Los temas se insertarán dinámicamente aquí -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
    
                        <!-- Certificación -->
                        <section class="mb-5">
                            <h2 class="h3 mb-3">Certificación</h2>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Certificado de Finalización</h5>
                                    <p class="card-text">Emitida por Asociación PSI.</p>
                                    <ul class="list-group list-group-flush" id="listaCertificaciones">
                                        <!-- Las certificaciones se insertarán dinámicamente aquí -->
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Sidebar -->
                    <div class="col-lg-4" id="inscripcion">
                        <div class="card position-sticky" style="top: 150px;">
                            <div class="card-body">
                                <h3 class="card-title">Inscríbete Ahora</h3>
                                <p class="card-text h4 mb-4 precio-card">U$D ${curso.precio}</p>
                                <ul class="list-group list-group-flush mb-4">
                                    <li class="list-group-item"><i class="fas fa-check text-success me-2"></i>Acceso ilimitado al contenido</li>
                                    <li class="list-group-item"><i class="fas fa-check text-success me-2"></i>Soporte técnico</li>
                                    <li class="list-group-item"><i class="fas fa-check text-success me-2"></i>Certificado de finalización</li>
                                </ul>
                                <a href="./inscripcion.html" class="btn btn-primary btn-lg mb-3">Inscribirse</a>
                                <button class="btn btn-outline-primary btn-lg mb-3" id="btnAgregarCarrito" onclick="agregarAlCarrito(${curso.idcur})">
                                    <i class="fa-solid fa-plus me-3"></i> al carrito
                                </button>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Obtener los temas de la propiedad 'temario' del curso (separados por '|')
    const listaTemas = document.querySelector('#listaTemas');
    const temas = curso.temario.split('|'); // Separar la cadena de temas en un array

    // Iterar sobre los temas y generar elementos <li> para cada uno
    temas.forEach(tema => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = tema;
        listaTemas.appendChild(li); // Añadir el tema al <ul>
    });

    // Obtener las certificaciones de la propiedad 'certificaciones' del curso (separadas por '|')
    const listaCertificaciones = document.querySelector('#listaCertificaciones');
    const certificaciones = curso.certificaciones.split('|'); // Separar la cadena de certificaciones en un array

    // Iterar sobre las certificaciones y generar elementos <li> para cada una
    certificaciones.forEach(certificacion => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>${certificacion}`;
        listaCertificaciones.appendChild(li); // Añadir la certificación al <ul>
    });
};


// Buscar el curso por ID
const cargarPlanPorID = async () => {
    await cargarCursos();  // Asegura que los cursos estén cargados
   // console.log('Cursos cargados:', cursos);
  // Asegura que los cursos estén cargados
    
    const cursoEncontrado = cursos.find(curso => {
    //console.log('Comparando curso.idPlan:', curso.idPlan, 'con cursoID:', planID);
    return curso.idPlan === planID;
    });
    // Busca el curso por ID
    if (cursoEncontrado) {
        mostrarDetalleCurso(cursoEncontrado); 
        mostrarBannerCurso(cursoEncontrado);
        // Muestra los detalles del curso
    } else {
        console.error('Curso no encontrado');
    }
};


// Función para renderizar los cursos en el Owl Carousel
const renderizarCursos = () => {
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
                <p><i class="fa-regular fa-calendar me-2"></i> Inicio: ${curso.fechainicio}</p>
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
  };
  
  // Llamar a la función para cargar los cursos
  cargarCursos();
// Llamar a la función para cargar el curso al abrir la página
cargarPlanPorID();
