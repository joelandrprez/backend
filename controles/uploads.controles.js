const { response } = require("express");
const { v4 : uuidv4 } = require ('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')
const fs = require('fs')

const path = require('path')


const fileUpload = ( req , res =response ) =>{
    const tipo = req.params.tipo;
    const id  =req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios']

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'el tipo seleccionado no es valido(tipo)'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no se seleccio el archivo'
        });
      }
    const file =  req.files.imagen;

    const nombreCortado = file.name.split('.');

    const extension = nombreCortado[nombreCortado.length-1];

    //validar extension

    const extensionValida = ['png','jpg','jpeg','gif','JPG']

    if(!extensionValida.includes(extension)){
        return res.status(400).json({
            ok:false,
            msg:'no es una extencion valida'
        })

    }
    //generar el nombre del archivo
    
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //crear el path
    const path = `./uploads/${ tipo }/${nombreArchivo}`

    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok:false,
                msg:'erro al subir el archivo'
            });
        }
    //actualizar imagen
    actualizarImagen( tipo,id,nombreArchivo );
    
        res.status(200).json({
            ok:true,
            msg:'se subio',
            nombreArchivo
        })
      });



}

const retornarImagen = (req,res ) =>{
    const coleccion = req.params.tipo;
    const img = req.params.img;

    const pathCompleto = path.join(__dirname,`../uploads/${coleccion}/${img}`);

    //imagen por defecto
    if(fs.existsSync(pathCompleto)){
        res.sendFile(pathCompleto);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`)
        res.sendFile(pathImg);

    }




}

module.exports={
    fileUpload,
    retornarImagen
}