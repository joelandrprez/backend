/*
 
    /api/todo

*/


const { Router } = require('express');
const {  getBusqueda,getBusquedaCollecion }  = require('../controles/Busqueda.controles')

//middleware validacion
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');

const router = Router();


router.get('/:busqueda',[ 
                        validarJWT
                        ],getBusqueda);
router.get('/coleccion/:coleccion/:busqueda',[ 
                                             validarJWT
                                            ],getBusquedaCollecion);




module.exports = router