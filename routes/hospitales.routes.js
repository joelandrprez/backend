/*
 
    /api/hospitales

*/

const { Router } = require('express');
const {  getHospitales,createHospitales,updateHospitales,deleteHospitales }  = require('../controles/hospitales.controles')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');


const router = Router();


router.get('/',[
                validarJWT
                ],getHospitales);

router.post('/',[
                validarJWT
                
                ],createHospitales);
router.put('/:id',[
                check('nombre','El nombre del medico es nesesario').not().isEmpty(),
                validarJWT,
                validarCampos
                ],updateHospitales);

router.delete('/:id',[
                    validarJWT
                    ],deleteHospitales);

module.exports = router