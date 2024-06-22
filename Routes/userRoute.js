import express from "express";
import { userModel } from "../Models/userModel.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const user_req = {
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
  };

  try {
    const user = userModel.findOne({ eamil: req.body.email });
    if (user) {
      throw new Error("user already exists");
    }
    await userModel.create(user_req);
    console.log("entered in db");
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
});


userRouter.get("/userlist", async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err.message);
      res.send(err.message)
    }
  });

  userRouter.delete('/remove',async (req,res)=>{
    const email = req.body.email;
    try{
        await userModel.findOneAndDelete({email: email})
        res.status(200).send("user deleted successfully");
    }
    catch (err) {
      console.log(err.message);
      res.send(err.message)
    }
  });

userRouter.post('/login',async(req,res) => {
    const email = req.body.email;
    try{
        const user = await userModel.findOne({email: req.body.email})
        console.log(user);
        if(!user){
            throw new Error('user not exist');
        }
        console.log("user logged in ");
        res.status(201).send("login succesfull");
    }
    catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
})

userRouter.put('/update', async(req, res) => {
    const {email , mobileNumber} = req.body
    try{ 
      const updated_user =   await userModel.findOneAndUpdate({email : email}, {mobileNumber: mobileNumber},{new : true})
      if(!updated_user){
        throw new Error('user is not updated')
      }
      res.status(200).send('user updated successfully')
    }
    catch(err){
        res.send(err.message)
    }

  })



export { userRouter };
