<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root"; // Cambiar por el usuario de tu base de datos
$password = ""; // Cambiar por la contraseña de tu base de datos
$dbname = "psi"; // Base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consultar los registros de la base de datos
$sql = "SELECT * FROM adm_cur"; // Cambiar 'tabla_registros' por el nombre de tu tabla
$result = $conn->query($sql);

$registros = array();

// Si hay resultados, los agregamos al array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $registros[] = $row;
    }
}

// Devolver los datos en formato JSON
echo json_encode($registros);

// Cerrar la conexión
$conn->close();
?>