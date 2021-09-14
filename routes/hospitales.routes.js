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
                check('hospital','El Id del hospital debe ser valido').isMongoId(),
                validarJWT,
                validarCampos
                ],updateHospitales);

router.delete('/:id',[
                        validarJWT
                    ],deleteHospitales);

module.exports = router