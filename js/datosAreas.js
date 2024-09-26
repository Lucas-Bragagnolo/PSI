
// Función para obtener las áreas desde la API
async function obtenerAreas() {
  try {
    const response = await fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=areas');
    if (!response.ok) {
      throw new Error('Error al obtener las áreas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Array para almacenar las áreas
let areas = [];

// Llenar el array de áreas
obtenerAreas().then(areasObtenidas => {
  areas = areasObtenidas;
  console.log('Áreas cargadas:', areas);
}).catch(error => {
  console.error('Error al cargar las áreas:', error);
});
