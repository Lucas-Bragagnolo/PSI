    // Recuperar datos del alumno del sessionStorage
    const alumnoData = JSON.parse(sessionStorage.getItem('nuevoAlumno'));

    // Recuperar datos del carrito del sessionStorage
    const carritoData = JSON.parse(sessionStorage.getItem('carrito'));

    // Función para mostrar los datos del alumno y los cursos
    function mostrarDatos() {
        if (alumnoData && carritoData) {
            // Mostrar datos del alumno
            const alumnoInfo = document.getElementById('alumno-info');
            alumnoInfo.innerHTML = `
                <h2>Datos del Alumno</h2>
                <p><strong>Nombre:</strong> ${alumnoData.nombre}</p>
                <p><strong>Apellido:</strong> ${alumnoData.apellido}</p>
                <p><strong>Documento:</strong> ${alumnoData.documento}</p>
                <p><strong>Email:</strong> ${alumnoData.email}</p>
                <p><strong>Teléfono:</strong> ${alumnoData.telefono}</p>
                <p><strong>País:</strong> ${alumnoData.pais}</p>
            `;
    
            // Mostrar datos de los cursos
            const cursosInfo = document.getElementById('cursos-info');
            cursosInfo.innerHTML = '<h2>Cursos Inscriptos</h2>';
            carritoData.forEach((curso) => {

                let modalidadTexto;
                if (curso.modalidad === '1') {
                    modalidadTexto = 'Online';
                } else if (curso.modalidad === '2') {
                    modalidadTexto = 'OnDemand';
                } else {
                    modalidadTexto = 'Desconocida';
                }
                

                cursosInfo.innerHTML += `
                    <div class="curso-item">
                        <h3>${curso.nombre}</h3>
                        <p><strong>Modalidad:</strong> ${modalidadTexto}</p>
                        <p><strong>Fecha inicio:</strong> ${curso.fechainicioletras}</p>
                    </div>
                    <hr>
                `;
            });
        } else {
            console.log('No se encontraron datos en el sessionStorage');
            document.getElementById('info-container').innerHTML = '<p>No se encontraron datos de inscripción.</p>';
        }
    }
    
    // Llamar a la función para mostrar los datos
    mostrarDatos();



    // Función para enviar datos a la API
    function enviarDatosAPI(alumnoData, carritoData) {
        // Crear objeto con los datos del alumno
        const datosEnvio = { ...alumnoData };

        // Agregar array de idcur del carrito
        datosEnvio.cursos = carritoData.map(item => item.idcur);

        // Construir la URL de la API con los datos del alumno y cursos
        const apiUrl = new URL('https://psi.planbsistemas.com.ar/api_psi.php');
        apiUrl.searchParams.append('accion', 'agregar');
        apiUrl.searchParams.append('apellido', datosEnvio.apellido);
        apiUrl.searchParams.append('nombre', datosEnvio.nombre);
        apiUrl.searchParams.append('documento', datosEnvio.documento);
        apiUrl.searchParams.append('email', datosEnvio.email);
        apiUrl.searchParams.append('telefono', datosEnvio.telefono);
        apiUrl.searchParams.append('pais', datosEnvio.pais);

        // Agregar los cursos y sus importes
        datosEnvio.cursos.forEach((curso, index) => {
            apiUrl.searchParams.append(`idcur${index + 1}`, curso);
        });

        // Debug: Imprimir la URL completa
        //console.log('URL de la API:', apiUrl.toString());


        // Enviar datos a la API
        fetch(apiUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosEnvio),
        })
        .then(response => response.json())
        .then(data => {
           // console.log('Respuesta de la API:', data);
            // Aquí puedes manejar la respuesta de la API
        })
        .catch(error => {
            console.error('Error al enviar datos a la API:', error);
        });
    }

    // Verificar si los datos existen y enviarlos a la API
    if (alumnoData && carritoData) {
        enviarDatosAPI(alumnoData, carritoData);
    } else {
        console.log('No se pueden enviar datos a la API: Datos incompletos');
    }



    //funcion para limpiar el alumnoNuevo
    function limpiarSessionStorage() {
        sessionStorage.removeItem('alumnoNuevo');
        sessionStorage.removeItem('carrito');
        console.log('Datos del sessionStorage limpiados');
    }
    
    limpiarSessionStorage();
    

    //limpiarCarrito();

