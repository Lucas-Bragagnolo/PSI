

// Función para obtener los países desde la API
function obtenerPaises() {
  fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=paises')
    .then(response => response.json())
    .then(data => {
      llenarSelectPaises(data);
    })
    .catch(error => {
      console.error('Error al obtener los países:', error);
    });
}

// Función para llenar el select de países
function llenarSelectPaises(paises) {
  const selectPaises = document.getElementById('pais');
  
  if (!selectPaises) {
    console.error('No se encontró el elemento select de países');
    return;
  }

  // Ordenar los países alfabéticamente por nombre


  // Limpiar las opciones existentes
  selectPaises.innerHTML = '<option value="">Seleccione un país</option>';

  // Agregar las nuevas opciones
  paises.forEach(pais => {
    const option = document.createElement('option');
    option.value = pais.codigo;
    option.textContent = pais.nombre;
    selectPaises.appendChild(option);
  });
}

// Llamar a la función para obtener los países cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerPaises);



function mostrarResumenCarrito() {
    const resumenCarrito = document.getElementById('resumenCarrito');
    const totalResumen = document.getElementById('resumenTotal');
    const promocionCard = document.getElementById('promocionCard');
    if (!resumenCarrito || !totalResumen) {
      console.error('No se encontraron los elementos necesarios para mostrar el resumen del carrito');
      return;
    }
    function calcularDescuento(subtotal) {
        const cursoModalidad1 = carrito.some(curso => curso.modalidad == 1);
        const cursoModalidad2 = carrito.some(curso => curso.modalidad == 2);  
        //console.log("asdasd", cursoModalidad1, cursoModalidad2);
          
        if (cursoModalidad1 && cursoModalidad2) {
            return subtotal * 0.2;
        } else {
            return 0;
        }
      }
  
    const carritoData = sessionStorage.getItem('carrito');
    const carrito = carritoData ? JSON.parse(carritoData) : [];
  
    const subtotal = carrito.reduce((acc, { precio }) => acc + parseFloat(precio), 0);
    console.log("SubTotal: " + subtotal);
    
    const descuento = calcularDescuento(subtotal);
    console.log("descuento: " + descuento);
    const total = subtotal - descuento;
  
    totalResumen.innerHTML = `
      <p class="card-text h4 mb-4 precio-card">U$D ${total.toFixed(2)}</p>
    `;
    resumenCarrito.innerHTML = '';  
  
    if (carrito.length === 0) {
      resumenCarrito.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
      return;
    }
  
    carrito.forEach(({ nombre, precio }) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${nombre}
        <span class="badge bg-primary rounded-pill">U$D ${parseFloat(precio).toFixed(2)}</span>
      `;
      resumenCarrito.appendChild(li);
    });

    if(carrito.length === 1) {
      promocionCard.classList.remove('d-none');
      const imgBanner = document.getElementById('img-banner');
      imgBanner.classList.remove('d-none');
    }
  
    if (descuento > 0) {
      const descuentoLi = document.createElement('li');

      descuentoLi.className = 'list-group-item d-flex justify-content-between align-items-center';
      descuentoLi.innerHTML = `
        Promocion 20% OFF
        <span class="badge bg-danger rounded-pill">- U$D ${descuento.toFixed(2)}</span>
      `;
      resumenCarrito.appendChild(descuentoLi);
    }
    

  }

mostrarResumenCarrito();

function guardarDatosAlumno() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const pais = document.getElementById('pais').value;
  const documento = document.getElementById('documento').value;

  const nuevoAlumno = {
      nombre,
      apellido,
      email,
      telefono,
      pais,
      documento
  };

  sessionStorage.setItem('nuevoAlumno', JSON.stringify(nuevoAlumno));
}
// Función para actualizar el carrito
function actualizarCarrito(nuevoCarrito) {
  carrito = nuevoCarrito;
  mostrarResumenCarrito();
}

// Ejemplo de uso:
// Cuando se modifique el carrito en cualquier parte del código, llamar a:
// actualizarCarrito(nuevoEstadoDelCarrito);


// Función para validar el formulario
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('inscripcionForm');
  var botonPagar = document.getElementById('botonPagar');

  // Verificar si todos los campos del formulario son válidos
  function todosLosCamposValidos() {
      return form.checkValidity();
  }

  // Escuchar el evento de input en cada campo
  form.querySelectorAll('input, select').forEach(function (input) {
      input.addEventListener('input', function () {
          form.classList.add('was-validated'); // Activa la clase de validación en el formulario
          if (todosLosCamposValidos()) {
              botonPagar.classList.remove('disabled');
              botonPagar.removeAttribute('disabled');
              guardarDatosAlumno();

              
                            // Obtener los parámetros necesarios
              const pais = document.getElementById('pais').value; // Asegúrate de tener un elemento con id 'param1'
              const importe = JSON.parse(sessionStorage.getItem('carritoTotal'));
  
                // Llamar a la API y actualizar el href del botón
                fetch(`https://psi.planbsistemas.com.ar/api_psi.php?accion=dlocal&importe=${importe}&pais=${pais}`)
                    .then(response => response.json())
                    .then(data => {
                        const nuevaURL = data.url; // Asume que la API devuelve un objeto con una propiedad 'url'
                        botonPagar.href = nuevaURL;
                    })
                    .catch(error => {
                        console.error('Error al obtener la URL de pago:', error);
                    });
              






          } else {
              botonPagar.classList.add('disabled');
              botonPagar.setAttribute('disabled', true);
          }
      });
  });

  // Manejar el evento de envío del formulario para evitar el envío si no es válido
  form.addEventListener('submit', function (event) {
      if (!todosLosCamposValidos()) {
          event.preventDefault();
          event.stopPropagation();
      } else {
          // Aquí podés manejar la lógica de envío del formulario si es válido
          alert('Formulario válido. Enviando...');
      }
  });
});


