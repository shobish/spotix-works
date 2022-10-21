const express=require ('express');
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
app.use("/",router);
const { Product } =require('./modules/mongoose');
const authRoute=require('./route/auth');
//mongoose
const mongoose=require ('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;  
const channelModel = require('./modules/mongoose');
const DB = "mongodb+srv://shobish:Shobish1234@cluster0.qail2gv.mongodb.net/api?retryWrites=true&w=majority";
const params={
    useNewUrlParser: true,
   useUnifiedTopology: true
};
mongoose.connect(DB,params).then( ()=> console.log("connect")).catch((err)=> console.log("not connected") );

//jsw
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// ui welcome

app.use('/api',authRoute);

router.get('/',(req,res)=>{
    res.send("<h1>welcome to connect with db </h1>");
});



// search product
router.get ('/api/product', (req,res)=>{
    Product.find( {}, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });

});



//for adding data

router.post('/api/add', (req, res) => {
    
    const pdt = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    
    pdt.save((err, data) => {
        if(!err) {
            res.send(data).status(200);
        } else {
           console.log(err);
        }
    });
});

//for deleteing data

router.delete('/api/delete/:id',(req,res)=>{

    Product.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data).status(200);
        }
    });

});


//update 
 router.put('/api/update/:id',(req,res)=>{
    const pdt ={
        name: req.body.name,
        category:req.body.category,
        price:req.body.price
    };
    Product.findByIdAndUpdate(req.params.id, {$set:pdt} , {new:true} ,(err,data)=>{
        if(err){
            console.log(err);
        } else{
            res.status(200).json({code: 200, message: 'Product Updated Successfully', updateProduct: data})
        }
    });
 });

 

//update 
router.put('/api/update/:id',(req,res)=>{
    const pdt ={
        name: req.body.name,
        category:req.body.category,
        price:req.body.price
    };
    Product.findByIdAndUpdate(req.params.id, {$set:pdt} , {new:true} ,(err,data)=>{
        if(err){
            console.log(err);
        } else{
            res.status(200).json({code: 200, message: 'Product Updated Successfully', updateProduct: data})
        }
    });
 });



 function veryfyToken(req,res,next){
    let authHeader=req.headers.authorization;
    if(authHeader===undefined){
        res.json({
            message:'there is no token'
        })
    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,'verifyed', function(err,data){
        if(err){
            res.json({
                message:'this is an error in token'
            })
        }else{
            res.send(data)
        }
    })

}
app.post('/jwt',(req,res)=>{
    
})











app.listen(3001);
