/*
 
    /api/medicos

*/

const { Router } = require('express');
const {  getMedicos,createMedicos,updateMedicos,deleteMedicos,getMedicosbyid }  = require('../controles/Medicos.controles')
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
                check('nombre','El nombre del medico es nesesario').not().isEmpty(),
                check('hospital','El Id del hospital debe ser valido').isMongoId(),
                validarJWT
                ],updateMedicos);

router.delete('/:id',[
                    validarJWT
                    ],deleteMedicos);

router.get('/:id',[
                    validarJWT
                    ],getMedicosbyid);


module.exports = router