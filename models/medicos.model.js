const {Schema,model} = require('mongoose');

const MedicosSchema = Schema({
    nombre:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }

},{collection:'medicos'});

MedicosSchema.method('toJSON',function(){
    const { __v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('medicos',MedicosSchema);