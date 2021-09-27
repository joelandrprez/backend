/*
 
    /api/upload

*/


const { Router } = require('express');

const { fileUpload,retornarImagen } = require('../controles/uploads.controles');

const ExpressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');

const router = Router();

router.use(ExpressfileUpload());


router.put('/:tipo/:id',[validarJWT ],fileUpload);

router.get('/:tipo/:img',[],retornarImagen);



module.exports = router