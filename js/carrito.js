carrito=[];
const contenedorCarrito = document.getElementById('carrito');
//cargar carrito
function cargarCarrito() {
  const carritoGuardado = sessionStorage.getItem('carrito');
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      mostrarCarrito(); // Mostrar el carrito cargado
  }
}
// Función para guardar el carrito en sessionStorage
function guardarCarrito() {
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
}
// Función para agregar productos al carrito
function agregarAlCarrito(cursoID) {
  const cursoEncontrado = cursos.find(curso => curso.idcur == cursoID);
  if (cursoEncontrado) {
    const cursoExistente = carrito.find(curso => curso.idcur == cursoID);
    if (!cursoExistente) {
      carrito.push(cursoEncontrado);
      console.log(carrito);
      Toastify({
        text: "Agregaste un Curso al carrito",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
      
      guardarCarrito();
      mostrarCarrito();  
      actualizarBadgeCarrito();
    } else {
      Toastify({
        text: "Este curso ya está en el carrito",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff6b6b, #ff8e8e)",
        },
        onClick: function(){}
      }).showToast();
    }
  }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(cursoID) {
  const indice = carrito.findIndex(curso => curso.idcur === cursoID);
  console.log(indice);
  
    carrito.splice(indice, 1);
    guardarCarrito();
    mostrarCarrito();
    actualizarBadgeCarrito();    
    Toastify({
      text: "Curso eliminado del carrito",
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff6b6b, #ff8e8e)",
      },
      onClick: function(){}
    }).showToast();  
    console.log(carrito);
  }

// Función para renderizar el carrito
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById('carritoItems');
  contenedorCarrito.innerHTML = '';
  carrito.forEach(({ imgportada, precio, fechainicioletras, idcur, nombre}) => {
    const item = document.createElement('div');
    item.className = 'card mb-3 position-relative';
    item.innerHTML = `
        <div class="row g-0">
            <div class="col-3 col-md-3 mt-3">
                <img src="../img/${imgportada}" class="img-fluid rounded-start" alt="Imagen del curso">
            </div>
            <div class="col-7 col-md-7">
                <div class="card-body">
                    <h2 class="h6">${nombre}</h2>
                    <p class="card-text mb-1">
                        <span class="sr-only">Fecha de inicio:</span>
                        <small><i class="fas fa-calendar me-2" aria-hidden="true"></i>${fechainicioletras}</small>
                    </p>                            
                    <p class="card-text mb-0">
                        <span class="sr-only">Precio:</span>
                        <strong aria-label="${precio} dólares">U$D ${precio}</strong>
                    </p>
                </div>
            </div>
            <div class="col-2 d-flex align-items-start justify-content-start">
                <button type="button" class="btn borrar-curso" onclick="eliminarDelCarrito(${idcur})" aria-label="Eliminar curso">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;
      contenedorCarrito.appendChild(item);
  });
  mostrarTotalCarrito();
}

// Función para mostrar el total del carrito
function mostrarTotalCarrito() {
  const totalElement = document.getElementById('total-carrito');
  const subtotal = carrito.reduce((acc, { precio }) => acc + parseFloat(precio), 0);
  const descuento = calcularDescuento(subtotal);
  
  const total = subtotal - descuento;
  totalElement.innerHTML = `
    <h4>Subtotal: U$D ${subtotal.toFixed(2)}</h4>
    <h4>Descuento: U$D ${descuento.toFixed(2)}</h4>
    <h4>Total: U$D ${total.toFixed(2)}</h4>
  `;

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

}


// Función para mostrar el resumen del carrito
function mostrarResumenCarrito() {
  const resumenCarrito = document.getElementById('resumenCarrito');
  const totalResumen = document.getElementById('resumenTotal');
  
  if (!resumenCarrito || !totalResumen) {
    console.error('No se encontraron los elementos necesarios para mostrar el resumen del carrito');
    return;
  }

  const subtotal = carrito.reduce((acc, { precio }) => acc + parseFloat(precio), 0);
  const descuento = calcularDescuento(subtotal);
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

  if (descuento > 0) {
    const descuentoLi = document.createElement('li');
    descuentoLi.className = 'list-group-item d-flex justify-content-between align-items-center';
    descuentoLi.innerHTML = `
      Descuento
      <span class="badge bg-danger rounded-pill">- U$D ${descuento.toFixed(2)}</span>
    `;
    resumenCarrito.appendChild(descuentoLi);
  }
}

function calcularDescuento(subtotal) {
  const cursoModalidad1 = carrito.some(curso => curso.modalidad == 1);
  const cursoModalidad2 = carrito.some(curso => curso.modalidad == 2);
    
  if (cursoModalidad1 && cursoModalidad2) {
    return subtotal * 0.2;
  } else {
    return 0;
  }
}
// Modificar la función mostrarCarrito para incluir el resumen
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById('carritoItems');
  contenedorCarrito.innerHTML = '';
  carrito.forEach(({ imgportada, precio, fechainicioletras, idcur, nombre}) => {
    const item = document.createElement('div');
    item.className = 'card mb-3 position-relative';
    item.innerHTML = `
        <div class="row g-0">
            <div class="col-3 col-md-3 mt-3">
                <img src="../img/${imgportada}" class="img-fluid rounded-start" alt="Imagen del curso">
            </div>
            <div class="col-7 col-md-7">
                <div class="card-body">
                    <h2 class="h6">${nombre}</h2>
                    <p class="card-text mb-1">
                        <span class="sr-only">Fecha de inicio:</span>
                        <small><i class="fas fa-calendar me-2" aria-hidden="true"></i>${fechainicioletras}</small>
                    </p>                            
                    <p class="card-text mb-0">
                        <span class="sr-only">Precio:</span>
                        <strong aria-label="${precio} dólares">U$D ${precio}</strong>
                    </p>
                </div>
            </div>
            <div class="col-2 d-flex align-items-start justify-content-start">
                <button type="button" class="btn borrar-curso" onclick="eliminarDelCarrito(${idcur})" aria-label="Eliminar curso">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;
    contenedorCarrito.appendChild(item);
  });
  mostrarTotalCarrito();
  mostrarResumenCarrito();
}






// Función para actualizar el badge del carrito
function actualizarBadgeCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const carritoBadge = document.getElementById('carrito-badge');
    const cantidadItems = carrito.length;

    if (cantidadItems > 0) {
        carritoBadge.textContent = cantidadItems;
        carritoBadge.style.display = 'inline';
    } else {
        carritoBadge.style.display = 'none';
    }
}

// Función para limpiar el carrito
function limpiarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
  actualizarBadgeCarrito();
} 

// Event listeners

document.addEventListener('DOMContentLoaded', actualizarBadgeCarrito);
document.addEventListener('DOMContentLoaded', cargarCarrito);