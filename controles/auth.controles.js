const Usuario = require('../models/usuarios.model')
const { request,response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const login = async (req,res =response)=>{
    const { email,password } = req.body;
    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({email})
        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            })
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);//si la encuentra y compara regresa un true

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'constraseña no valida'
            })
        }


        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok:true,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'error inesperado revisar log'
        })
    }
}

module.exports = {
    login
}