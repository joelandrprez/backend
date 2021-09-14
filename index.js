const { application } = require('express');
const express = require ('express');
require ('dotenv').config();
const cors = require('cors')



const {dbConnection} = require('./DB/config')

const app = express();

app.use(cors());

app.use(express.json()); // parseo de las rutas

dbConnection();

// RUTAS
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));






app.listen(process.env.PORT,()=>{
    console.log('se levanto el servidor en el puerto 3000');
})