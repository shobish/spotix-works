const mongoose =require ('mongoose');

const NameSchema= new mongoose.Schema({
    name:{
        type:'string',
        required:'true'
    },
    age:{
        type:'number',
        required:'true'
    },
    place:{
        type:'string',
        required:'true'
    }
})

const SchemaModel=mongoose.model('login', NameSchema)

module.exports= SchemaModel