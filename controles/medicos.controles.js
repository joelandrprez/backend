const Medicos = require('../models/medicos.model')
const { request,response } = require('express')

const getMedicos = async (req,res) =>{

    try {
        const medicos = await Medicos.find()
                                    .populate('usuario','nombre email img')
                                    .populate('hospital','nombre')


        res.status(200).json({
            ok:true,
            medicos,
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

const createMedicos = async (req,res) =>{
    const uid = req.uid;
    const medico = new Medicos({
        usuario:uid,
        ...req.body
    });

    try {


        await medico.save();


        res.status(200).json({
            ok:true,
            medico,
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

const updateMedicos = async (req,res =response) => {
    const uid = req.params.id;
    const campos = req.body; // arreglarlo
    try {

        const medicoDB = await Medicos.findById(uid)


        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe el medico'
            })
        }

        const medicoActualizado  =await Medicos.findByIdAndUpdate(uid,campos,{new:true});

        res.status(200).json({
            ok:true,
            medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}
const deleteMedicos = async (req,res)=>{
    const uid = req.params.id;
    
    try {


        const medicoDB = await Medicos.findById(uid)


        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe el medico'
            })
        }

        await Medicos.findByIdAndDelete(uid)



        res.status(200).json({
            ok:true,
            msg:'se Elimino el medico',
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
const getMedicosbyid = async (req,res)=>{

    const uid = req.params.id;

    try {

        const medicos = await Medicos.findById(uid)
        .populate('usuario','nombre email img')
        .populate('hospital','nombre')

        res.status('200').json({
        ok:true,
        medicos
        })

        
    } catch (error) {
        console.log(error);
    }


}


module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos,
    getMedicosbyid
}