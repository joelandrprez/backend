/*
 
    /api/medicos

*/

const { Router } = require('express');
const {  getMedicos,createMedicos,updateMedicos,deleteMedicos }  = require('../controles/Medicos.controles')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');


const router = Router();


router.get('/',[
                validarJWT
                ],getMedicos);

router.post('/',[
                 validarJWT
                ],createMedicos);
router.put('/:id',[
                validarJWT
                ],updateMedicos);

router.delete('/:id',[
                        validarJWT
                    ],deleteMedicos);

module.exports = router