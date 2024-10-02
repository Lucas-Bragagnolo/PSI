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

  mostrarResumenCarrito();