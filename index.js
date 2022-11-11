/*Incluir la biblioteca para poder ser usada en el código*/
var express = require('express');

/*Crear una app de Express*/
var app = express();

/*Utilizar el módulo "path" para ser específico respecto a la ubicación del archivo en nuestro proyecto de Node.js*/
const path = require('path');

/*Decodificar la información enviada en formato Json*/
app.use(express.json());//Reconoce el objeto de solicitud entrante como un objeto JSON
app.use(express.urlencoded());//Reconoce el objeto de solicitud entrante como cadenas o matrices

/*Crear una variable que contendrá un json donde se almacenarán los datos enviados desde la web.*/
var usuario = {
    nombre: '',
    apellido: '',
    id: ''
};

/*El método "get" responde a la solicitud del directorio raíz del servidor enviando el archivo "index.html".*/
app.get('/',function(req,res){
    /*"path.join" permite hacer referencia a diversos directorios en el equipo. Para hacer referencia a la carpeta del proyecto Node.js*/
    res.sendFile(path.join(__dirname+'/html/index.html'));//Se hace referencia a que el archivo se encuentra dentro de una carpeta en el directorio raíz del proyecto
});;

/*El servidor genera la respuesta a la solicitud del botón "Crear nueva entrada de datos"*/
app.get('/crearEntrada', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/crearEntrada.html'));
});

/*Cuando los datos son rellenados y se presiona el botón de enviar, se está enviando al servidor la solicitud 
"envioDeDatos", en el servidor se genera la respuesta a esta solicitud y el comportamiento que se planea generar 
es que estos datos sean almacenados en el Json que se generó dentro del código del servidor*/
app.post('/envioDeDatos', function (req, res) {
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.id = req.body.id;
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

/*El servidor genera la respuesta a la solicitud del botón "Consultar Datos"*/
app.get('/consultarDatos', function (req, res) {
    if (usuario.nombre !== '' && usuario.apellido !== '' && usuario.id !== '') {
        res.json(usuario);
    } else {
        res.send("Datos no ingresado");
    }
});

/*El servidor genera la respuesta a la solicitud del botón "Eliminar Datos"*/
app.get('/eliminarDatos', function (req, res) {
    if (usuario.nombre !== '' && usuario.apellido !== '' && usuario.id !== '') {
        usuario.nombre = '';
        usuario.apellido = '';
        usuario.id = '';
        res.sendFile(path.join(__dirname + '/html/datosEliminados.html'));
    } else {
        res.send("Datos no ingresado");
    }
});

/*Crear la función que escuche las solicitudes del usuario*/
app.listen(8000, function () {
    console.log('Servidor corriendo en el puerto 8000');
});