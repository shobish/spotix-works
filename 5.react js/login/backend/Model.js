const mongoose =require ("mongoose")

const foodSchema=new mongoose.Schema({
    foodName:{
        type:'string',
        required:'true'
    },
    Days:{
        type:'number',
        required:'true'
    }
})
const foodModel=mongoose.model('login',foodSchema)

module.exports=foodModel;