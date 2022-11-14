const mongoose =require ('mongoose');

const NameSchema= new mongoose.Schema({
    name:{
        type:'string',
        required:'true'
    },
    order:{
        type:'number',
        required:'true'
    }
 
})

const SchemaModel=mongoose.model('login', NameSchema)

module.exports= SchemaModel