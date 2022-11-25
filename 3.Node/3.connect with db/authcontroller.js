const User = require('./modules/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//user registration

const register = (req,res, next) =>{
    bcrypt.hash(req.body.password, 10 , function(err, hashedPass){
        if (err){
            res.json({
                error:err
            })
        }       

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass
        })
        user.save()
        .then(user =>{
            res.json({
                message:'user added'
            })
        })
        .catch(error=>{
            res.json({
                message:'user not added'
            })
        })
    })
}

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
//user login

const login =  (req,res ,next) =>{ 
    var username = req.body.username
    var password = req.body.password
    console.log(username);
    User.findOne({$or: [{email:username},{name:username}]})
    .then(user =>{
        if( user){
            bcrypt.compare(password, user.password, function(err,result){
                if(err){
                    res.json({
                        error:err
                    });
                };
                if(result){
                    let token =jwt.sign({name: user.name},'verifyed',{expiresIn:'1hr'})
                    res.json({
                        message:token

                    })
                }else{
                    res.json({message:' password is wrong'});
                };

            });
        }else{
            res.json({message:'no user found'});
       };
      
});
};

//  //create token

//  const token = jwt.sign(
//     {user_id: user._id, email},
//     process.env.TOKEN_KEY,
//     {expiresIn:"2hr",}
//  );
//  User.token=token;


module.exports= {
    register,login
};
