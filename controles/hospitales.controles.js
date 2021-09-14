const Hospital = require('../models/hospital.model')
const { request,response } = require('express')
const bcrypt = require('bcryptjs');



const getHospitales = async (req,res) =>{

    try {
        const hospital = await Hospital.find().populate('usuario','nombre email img')

        res.status(200).json({
            ok:true,
            hospital,
            uid: req.uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }

}

const createHospitales = async (req,res) =>{
        const uid = req.uid;
        const hospital = new Hospital({
            usuario:uid,
            ...req.body
        });


    try {


        await hospital.save(hospital);


        res.status(200).json({
            ok:true,
            hospital
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}

const updateHospitales = async (req,res =response) => {
    const uid = req.params.id;
    const campos = req.body;
    try {

        const hospitalDB = await Hospital.findById(uid)


        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe el hospital'
            })
        }

        const hospitalActualizado  =await Hospital.findByIdAndUpdate(uid,campos,{new:true});

        res.status(200).json({
            ok:true,
            hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}
const deleteHospitales = async (req,res)=>{
    const uid = req.params.id;
    
    try {


        const hospitalDB = await Hospital.findById(uid)


        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe el hospital'
            })
        }

        await Hospital.findByIdAndDelete(uid)



        res.status(200).json({
            ok:true,
            msg:'se Elimino el Hospital',
            uid
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}


module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}