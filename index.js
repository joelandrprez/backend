const { application } = require('express');
const express = require ('express');
require ('dotenv').config();
const cors = require('cors')


const {dbConnection} = require('./DB/config')

const app = express();

app.use(cors());

dbConnection();

app.get('/',(req,res)=>{
    res.status(200).json({
        ok:true,
        msg:'hola mundo'
    })
})



app.listen(process.env.PORT,()=>{
    console.log('se levanto el servidor en el puerto 3000');
})