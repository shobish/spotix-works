const mongoose = require('mongoose');

// Product Schema
const Product = mongoose.model('api', {
  
    name: {
        type: String,
        required:true
    }, 
    category: {
        type:String,
        required:true
    },
    price: {
        type:String,
        required:true
    }
});






module.exports = { Product }