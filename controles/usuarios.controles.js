const Usuario = require('../models/usuarios.model')
const { request,response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req,res) =>{

    const  desde = Number(req.query.desde) || 0;


    // ejecutar variaas promesas al mismo tiempo
    const [usuarios,total] = await Promise.all([

    Usuario.find({},'nombre email role google img')
                                  .skip(desde)
                                  .limit(5),
    Usuario.countDocuments()
    ])



    res.status(200).json({
        ok:true,
        usuarios,
        uid: req.uid,
        total
        
    });
}

const createUsuarios = async (req,res) =>{
    const {nombre,password,email} = req.body;


    try {

        const existeEmail = await Usuario.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'el correo ya esta registrado'
            })
        }
        

        const usuario = new Usuario(req.body);
        

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);


        const token = await generarJWT(usuario.id);

        await usuario.save();

        
    
        console.log(req.body);
        res.status(200).json({
            ok:true,
            usuarios:usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'error inesperado revisar log'
        })
    }

}

const updateUsuarios = async (req,res =response) => {
    
    const uid = req.params.id;
    const {password,google,email,...campos} = req.body;//destructurar

    try {
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe el usuarios para ese ID'
            })
        }
        

        if( usuarioDb.email !== email){

            const existeEmail = await Usuario.findOne({email})
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'el correo ya esta registrado'
                })
            
            }   
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.status(200).json({
            ok:true,
            msg:usuarioActualizado
        })


        
    } catch (error) {   
        console.log('usuarios.controles/updateUsuarios',error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}
const deleteUsuarios = async (req,res)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:true,
                msg:'no se encontro el usuario'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok:true,
            msg:'Se elimino el usuario',
            uid
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}


module.exports = {
    getUsuarios,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios
}