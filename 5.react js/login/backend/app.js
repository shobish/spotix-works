const express= require ('express');
const mongoose=require('mongoose');
const cors=require ('cors')
const app=express();
const SchemaModel=require('./Model')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://shobish:Shobish1234@cluster0.qail2gv.mongodb.net/login',
  {
    useNewUrlParser: true
    
  });

app.get('/',(req,res)=>{
    res.send('ok lets start')
 
   
  })

app.post('/insertItem',async(req,res)=>{
  const Name=req.body.name
  const Order=req.body.order
  const list= new SchemaModel({name:Name, order:Order })
  await list.save()
  res.send('done')
 
})

app.get('/list',(req,res)=>{
  
   SchemaModel.find({}, (err,data)=>{
  if(err){
    console.log(err);
  }else{
    res.send(data)
  }

 }) 
})

app.put('/:id/update',async(req,res)=>{

  const newName=req.body.newName
  const id=req.body.id
  

  try{
    await SchemaModel.findById(id,(err,data)=>{
      data.name=newName
      console.log(data.name)
      data.save()
    })
}catch(err){
    console.log(err);
}


})


app.delete('/delete/:id',async(req,res)=>{
   const id=req.params.id
   await SchemaModel.findByIdAndDelete(id).exec();
   res.send('deleted')
})





app.listen(3001 ,()=>{
    console.log('server connected');

})