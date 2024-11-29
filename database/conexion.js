//const mysql = require('mysql2');
const mysql = require('mysql2/promise'); // Asegúrate de usar mysql2/promise

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root', // Asegúrate de completar estos campos
    //port: 3306,
    password: '', // Asegúrate de completar estos campos
    database: 'sistema_gestion_pruebas_umg',
};

// Crear una conexión a la base de datos
const db = mysql.createPool(dbConfig); // Usar createPool para manejar múltiples conexiones

module.exports = db;
