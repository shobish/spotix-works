const express = require("express");
const app = express();
require("dotenv").config();
const verifyToken = require("./middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;  
const DB = "mongodb+srv://shobish:Shobish1234@cluster0.qail2gv.mongodb.net/api?retryWrites=true&w=majority";
const params={
    useNewUrlParser: true,
   useUnifiedTopology: true
};
mongoose.connect(DB,params).then( ()=> console.log("connect")).catch((err)=> console.log("not connected") );




app.use(express.json());
//app.use(verifyToken);
// importing user context
const User = require("./model/user");




 

app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
  // Our register logic ends here
});
// app.get("/jwt", async (req, res) => {
//   //try {
//     // Get user input
//     //const token= req.headers['x-access-token'];
    
//     //const userdata = jwt.verify(token,process.env.TOKEN_KEY);
//     //const email = userdata.email;
//    // const user = await User.findOne({ email });

//    // if (token==null) {
//     //  res.status(400).send("Token required");
//   //  }
//   //  else {  // user
//  // res.status(200).send(user); 
//    //}   
//    //   } catch (err) {
//     console.log(err);
//   } 
// });

app.get("/jwt",verifyToken,(req, res) => {

 
  console.log(req.user);
  res.json({message:req.user});
});





app.listen(3001)