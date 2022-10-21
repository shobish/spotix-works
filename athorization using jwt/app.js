var express =require('express');
var jwt=require ('jsonwebtoken');
const app=express();


app.get('/api',(req,res)=>{
    res.json(
        {message:'api'}
    );
});

app.post('/login',(req,res)=>{
    const user ={id:3};
    const token=jwt.sign({user},'pass');
    res.json({
        token
    });

});

app.get('/protection',veryfyToken,(req,res)=>{
    jwt.verify(req.token,'pass',(err,data)=>{
        if(err){
            res.send('err');
        }else{
            res.send(data);
        }

    })
})

function veryfyToken(req,res,next){
    const bearerHeader =req.header['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer =bearerHeader.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.send('not verfied');
    }
}

app.listen(3001)