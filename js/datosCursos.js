// Array global para almacenar los cursos
let cursos = [];

// Función para cargar los cursos desde la API
const cargarCursos = async () => {
  try {
    const response = await fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=cursos'); // Reemplaza con la URL de tu API
    if (!response.ok) throw new Error('Error al cargar los cursos');
    
    cursos = await response.json(); // Asigna los cursos al array global
    renderizarCursos(); // Renderizar los cursos una vez que estén cargados
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Llamar a la función para cargar los cursos
cargarCursos();
