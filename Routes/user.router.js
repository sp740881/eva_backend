
const express=require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { UserModel } = require("../model/user.model")
const userRoute=express.Router()
userRoute.get("/",(req,res)=>{
    res.send("HOme")
})
//***************************************** */
userRoute.post("/register",async(req,res)=>{
    const data=req.body;
    const {email}=req.body;
    try {
      const check=await UserModel.exists({email})
      if(!check){
        bcrypt.hash(req.body.password, 3,async(err, hash)=>{
            req.body.password=hash
            const user=new UserModel(data)
            await user.save()
            res.status(200).send({"msg":"User ragistered succefullt"})
        });
      }else{
        res.status(400).send({"msg":"User already exist, please login"})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
/////********************************************************** */
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
      const valid=await UserModel.find({email})
      if(valid.length>0){
        jwt.sign({email:valid[0].email,id:valid[0]._id}, "shivam",(err, token)=> {
            // console.log(token);
            res.status(200).send(token)
          });
      }else{
        res.status(400).send({"msg":"User not exist, please ragister first"})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports={userRoute}


// {
//     "name":"shivam",
//     "email":"shiv@gamil.com",
//     "gender":"male",
//     "password":"shivam123",
//     "age":22,
//     "city":"Basti",
//     "is_married":false
// }