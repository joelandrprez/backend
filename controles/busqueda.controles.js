
const { request,response } = require('express')
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital.model')
const Usuario = require('../models/usuarios.model')
const Medicos = require('../models/medicos.model')

const getBusqueda = async (req,res) =>{
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda,'i');

    // const usuario = await Usuario.find({
    //     nombre : regex
    // })
    
    const [usuarios,hospitales,medicos] = await Promise.all([

        Usuario.find({
            nombre : regex
        }),
        Hospital.find({
            nombre : regex
        }),
        Medicos.find({
            nombre : regex
        })


    ])
    


    res.status(200).json({
        ok:true,
        usuarios,
        hospitales,
        medicos
    });
}
const getBusquedaCollecion = async (req,res)=>{
    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    
    const regex = new RegExp(busqueda,'i');
    let data = [];

    switch(coleccion){
        case 'medicos':

        data = await Medicos.find({nombre:regex})
                                    .populate('usuario','nombre email img')
                                    .populate('hospital','nombre')

            break;

        case 'usuarios':

        data = await Usuario.find({nombre:regex})

            break;

        case 'hospital':

        data = await Hospital.find({nombre:regex})
                                    .populate('usuario','nombre email img')

            break;

        default:

        return res.status(404).json({
            ok:false,
            msg:'no se encontro coleccion'

        })             
    
    }
    res.status(200).json({
        ok:true,
        data
    })


}

module.exports = {
    getBusqueda,
    getBusquedaCollecion
}
    
