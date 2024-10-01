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
          
          