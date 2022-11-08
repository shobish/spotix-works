const express= require ('express');
const mongoose=require('mongoose');
const cors=require ('cors')
const app=express();
const NameSchema=require('./Model')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://shobish:Shobish1234@cluster0.qail2gv.mongodb.net/login',
  {
    useNewUrlParser: true
    
  });


app.get('/data',async(req,res)=>{
  const list= new NameSchema({name:'aju', age:22, place:'kvm'})
  await list.save()
  res.send('done')
 
})

app.get('/list',async(req,res)=>{
 NameSchema.findOne({},(err,data)=>{
  if(err){
    console.log(err);
  }else{
    res.send(data)
  }

 }) 
})


app.listen(3001 ,()=>{
    console.log('server connected');

})