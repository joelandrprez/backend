

const jwt = require('jsonwebtoken');


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

module.exports = {
    validarJWT
}