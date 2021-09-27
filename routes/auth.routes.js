/*
 
    /API/login/

*/

const { Router } = require('express');
const { route } = require('./usuarios.routes');

// controladores 
const { login,loginGoogle,renewToken }  = require('../controles/auth.controles');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');


const router = Router();

router.post('/',[
                check('email','el Email deb ser valido').isEmail(),
                check('password','el Password debe ser valido').not().isEmpty(),
                validarCampos
                ],login);
router.post('/google',[
                check('token','el token de google debe ser valido').not().isEmpty(),
                validarCampos
                ],loginGoogle);                            
router.get('/renew',[
                validarCampos,
                validarJWT
                ],renewToken); 







module.exports = router