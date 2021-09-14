/*
 
    /API/login/

*/

const { Router } = require('express');
const { route } = require('./usuarios.routes');

// controladores 
const { login }  = require('../controles/auth.controles');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');


const router = Router();

router.post('/',[
                check('email','el Email deb ser valido').isEmail(),
                check('password','el Password debe ser valido').not().isEmpty(),
                validarCampos
                ],login);








module.exports = router