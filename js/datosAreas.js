let areas = [];

// Función para cargar las áreas desde la API
const cargarAreas = async () => {
  try {
    const response = await fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=areas');
    
    if (!response.ok) {
      throw new Error(`Error al cargar las áreas. Estado: ${response.status}`);
    }
    
    const data = await response.json();
    areas = data;
    
    return areas;
  } catch (error) {
    console.error('Error al cargar las áreas:', error);
    return [];
  }
};

// Llamada a la función para cargar las áreas
cargarAreas().then(() => {
  // Las áreas están ahora disponibles en el array global 'areas'
}).catch(error => {
  console.error('Error en la ejecución:', error);
});
