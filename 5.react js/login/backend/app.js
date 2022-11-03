const express= require ('express');
const mongoose=require('mongoose');
const cors=require ('cors')
const app=express();
const foodModel=require('./Model')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://shobish:Shobish1234@cluster0.qail2gv.mongodb.net/login',
  {
    useNewUrlParser: true
    
  });



 //inserted data will added to database 
app.post('/',async (req,res)=>{
  
  const foodName=req.body.foodName
  const Days=req.body.Days

  const food=new foodModel({foodName:foodName, Days: Days})
  console.log(food);

  try{
    await food.save()
    res.send('inserted')
  }catch(err){
    console.log(err);
    }

})

// To show the data from the database

app.get('/read',(req,res)=>{
  foodModel.find({},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.send(data)
    }
  })
  
})

//this will update the data
app.put('/update',async (req,res)=>{
  const updateName=req.body.updateName
  const id=req.body.id 

  try{
    await foodModel.findById(id,(err,updateList)=> {
      updateList.foodName=updateName
      updateList.save()
      res.send('update')
    })
    
  }catch(err){
    console.log(err);
    }

})
//this will delete the data
app.delete('/delete/:id',async (req,res)=>{

  const id=req.params.id

await foodModel.findByIdAndDelete(id).exec()
res.send('deleted')


})


app.listen(3001 ,()=>{
    console.log('server connected');

})