/*
 
    /API/usuarios/

*/

const { Router } = require('express');
const {  getUsuarios,createUsuarios,updateUsuarios,deleteUsuarios }  = require('../controles/usuarios.controles')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT, validarAdminRole,validarAdminRoleMismoUsuario } = require('../middlewares/validar-jwt.middlewares');


const router = Router();


router.get('/',[
                validarJWT,
                validarAdminRole
                ],getUsuarios);

router.post('/',[
    
                check('nombre','el nombre el obligatoria').not().isEmpty(),
                check('password','la contraseña es obligatorio').not().isEmpty(),
                check('email','el email es obligatorio').isEmail(),
                validarCampos
                ],createUsuarios);

router.put('/:id',[
                validarJWT,
                validarAdminRoleMismoUsuario,
                check('nombre','el nombre el obligatoria').not().isEmpty(),
                check('role','el role es obligatorio').not().isEmpty(),
                check('email','el email es obligatorio').isEmail(),
                
                validarCampos
                ],updateUsuarios);

router.delete('/:id',validarJWT,
                    validarAdminRole,
                    deleteUsuarios);

module.exports = router