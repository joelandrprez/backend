

const jwt = require('jsonwebtoken');
const usuario = require('../models/usuarios.model')
const validarJWT =  (req,res,next) =>{

    const token = req.header('x-token')


    if(!token){
            return res.status(401).json({
            ok:false,
            msg:'no existe token'
        })
    } 
    try { 

        
        const { uid }  = jwt.verify(token,process.env.JWT_SECRET); 
        req.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'token no valido'
        })
    }



    
}

const validarAdminRole=  async(req,res,next)=>{
    const uid = req.uid;

    try {
        const UsuarioDB = await usuario.findById(uid);
        if(!UsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'usuario no existe'
            })
        }
        if(UsuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'no es admin'
            })
        }
        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hablen con el administrador'
        })
    }


}


const validarAdminRoleMismoUsuario=  async(req,res,next)=>{
    const uid = req.uid;
    const id = req.params.id;//VALDIAR CON QUE CAMPO ESTA MANDANDO 


    try {
        const UsuarioDB = await usuario.findById(uid);
        if(!UsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'usuario no existe'
            })
        }
        if(UsuarioDB.role !== 'ADMIN_ROLE' || uid ===id){
            next();
        }else{
            res.status(403).json({
                ok:true,
                msg:'no tiene privilegios para realizar el cambio'
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hablen con el administrador'
        })
    }


}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleMismoUsuario
}