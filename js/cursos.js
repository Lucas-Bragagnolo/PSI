
// Cargar cursos al iniciar la página
document.addEventListener('DOMContentLoaded', renderizarTienda);

// Función para importar áreas desde una API
async function importarAreas() {
    try {
        const response = await fetch('https://api.ejemplo.com/areas');
        if (!response.ok) {
            throw new Error('No se pudo obtener las áreas');
        }
        const areas = await response.json();
        console.log('Áreas importadas:', areas);
        return areas;
    } catch (error) {
        console.error('Error al importar áreas:', error);
        return [];
    }
}

// Llamar a la función para importar áreas al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await importarAreas();
    renderizarTienda();
});

console.log(areas);
// Manejar el envío del formulario de filtros
document.getElementById('filtros-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const precioMinimo = parseFloat(document.getElementById('precio-minimo').value) || 0;
    const precioMaximo = parseFloat(document.getElementById('precio-maximo').value) || Infinity;

    // Filtrar cursos por precio
    cursos = cursos.filter(curso => {
        const precioCurso = parseFloat(curso.precio);
        return precioCurso >= precioMinimo && precioCurso <= precioMaximo;
    });

    
        // Filtrar cursos por modalidad
    const modalidad = parseInt(document.getElementById('modalidad').value);
    if (modalidad === 1 || modalidad === 2) {
        cursos = cursos.filter(curso => curso.modalidad === modalidad);
    }

    
    
    
    


    console.log('Filtros aplicados');
    renderizarTienda(); // Recargar cursos con los filtros aplicados
});

cargarCursos();
