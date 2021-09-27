const express = require ('express');
require ('dotenv').config();
const cors = require('cors')



const {dbConnection} = require('./DB/config')

const app = express();



app.use(cors())

app.use(express.json()); // parseo de las rutas

dbConnection();

//directorio public
app.use(express.static('public'))

// RUTAS
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/todo',require('./routes/busqueda.routes'));
app.use('/api/hospitales',require('./routes/hospitales.routes'));
app.use('/api/medicos',require('./routes/medicos.routes'));
app.use('/api/upload',require('./routes/uploads.routes'));









app.listen(process.env.PORT,()=>{
    console.log('se levanto el servidor en el puerto 3000');
})