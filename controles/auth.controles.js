const Usuario = require('../models/usuarios.model')
const { request,response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify');

const { getMenufrontEnd } = require('../helpers/menu-frontend');




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
            token,
            menu:getMenufrontEnd(usuarioDB.role)
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error inesperado revisar log'
        })
    }
}
const loginGoogle = async (req,res=response)=>{

    const googleToken = req.body.token;
    try {

        const {name , email , picture } = await googleVerify(googleToken);

        // 
        const usuarioDB = await Usuario.findOne({email})

        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT(usuario.id)

        res.status(200).json({
            ok:true,
            token,
            menu:getMenufrontEnd(usuario.role)
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'token no es correcto'
        })
    }


    // googleVerify(req.token);


}
const renewToken = async (req,res=response) =>{
    const uid = req.uid;

    const token = await generarJWT(uid)

    const usuario = await Usuario.findById(uid)

    res.status(200).json({
        ok:true,
        token,
        usuario,
        menu:getMenufrontEnd(usuario.role)
    })
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}