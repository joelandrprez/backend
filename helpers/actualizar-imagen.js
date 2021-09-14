
const Hospital = require('../models/hospital.model')
const Usuario = require('../models/usuarios.model')
const Medicos = require('../models/medicos.model')

const fs = require('fs')

const borrarImaagen = (path)=> {

    if(fs.existsSync(path)){//si existe lo elimina
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (tipo,id,nombreArchivo) =>{

    let pathViejo=''

switch(tipo){
    case 'medicos':
        const medico = await Medicos.findById(id);

        if(!medico){
            return false;
        }

        pathViejo = `./uploads/medicos/${medico.img}`;
        borrarImaagen(pathViejo);

        medico.img = nombreArchivo

        await medico.save();
        return true;
        break;

    case 'hospitales':
        const hospital = await Hospital.findById(id);

        if(!hospital){
            return false;
        }

        pathViejo = `./uploads/hospital/${hospital.img}`;
        borrarImaagen(pathViejo);

        hospital.img = nombreArchivo

        await hospital.save();
        return true;
    break;
    case 'usuarios':
        const usuarios = await Usuario.findById(id);

        if(!usuarios){
            return false;
        }

        pathViejo = `./uploads/hospital/${usuarios.img}`;
        borrarImaagen(pathViejo);

        usuarios.img = nombreArchivo

        await usuarios.save();
        return true;
    break;        
}



}

module.exports = {
    actualizarImagen
}